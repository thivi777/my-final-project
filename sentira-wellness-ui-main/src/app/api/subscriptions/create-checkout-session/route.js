import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { protect } from '@/lib/authMiddleware';
import Stripe from 'stripe';
import mongoose from 'mongoose';

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

// POST /api/subscriptions/create-checkout-session
export async function POST(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { priceId } = await request.json().catch(() => ({}));
    
    // Use priceId from request, or STRIPE_PRICE_ID, or fallback to the USD price from env
    const effectivePriceId = priceId || process.env.STRIPE_PRICE_ID || process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_USD;
    
    if (!effectivePriceId) {
      console.error('Missing Stripe Price ID in request and environment');
      return NextResponse.json({ success: false, message: 'Configuration error: Missing Price ID' }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: effectivePriceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/dashboard/activities?payment_success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard/premium`,
      client_reference_id: String(auth.user._id),
      customer_email: auth.user.email,
    });
    return NextResponse.json({ success: true, url: session.url });
  } catch (error) {
    console.error('Stripe Session Error:', error.message);
    return NextResponse.json({ success: false, message: error.message || 'Could not create checkout session' }, { status: 500 });
  }
}
