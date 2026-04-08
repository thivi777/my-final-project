import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Stripe from 'stripe';
import mongoose from 'mongoose';

export const config = { api: { bodyParser: false } };

function getUserModel() {
  if (mongoose.models.User) return mongoose.models.User;
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, email: { type: String, required: true, unique: true },
    password: String, role: { type: [String], enum: ['user', 'admin'], default: ['user'] },
    resetPasswordToken: String, resetPasswordExpire: Date,
    googleId: String, facebookId: String, appleId: String,
    isVerified: { type: Boolean, default: false }, verificationCode: String,
    isPremium: { type: Boolean, default: false }, subscriptionId: String,
    subscriptionStatus: { type: String, enum: ['none', 'active', 'past_due', 'canceled', 'trialing'], default: 'none' }
  }, { timestamps: true });
  return mongoose.model('User', userSchema);
}

// POST /api/subscriptions/webhook
export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers.get('stripe-signature');
  const rawBody = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  await connectDB();
  const User = getUserModel();

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await User.findByIdAndUpdate(session.client_reference_id, {
        isPremium: true,
        subscriptionId: session.subscription,
        subscriptionStatus: 'active'
      });
      break;
    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      const user = await User.findOne({ subscriptionId: subscription.id });
      if (user) {
        user.isPremium = false;
        user.subscriptionStatus = 'canceled';
        await user.save();
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
