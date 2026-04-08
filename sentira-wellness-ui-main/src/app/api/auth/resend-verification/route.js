import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/db';
import { protect } from '@/lib/authMiddleware';
import { sendEmail } from '@/lib/sendEmail';
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

// POST /api/auth/resend-verification
export async function POST(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const User = getUserModel();
    const user = await User.findById(auth.user._id);
    if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    if (user.isVerified) return NextResponse.json({ success: false, message: 'User already verified' }, { status: 400 });

    const verificationCode = crypto.randomInt(100000, 999999).toString();
    user.verificationCode = verificationCode;
    await user.save();
    await sendEmail(user.email, 'Your New Verification Code',
      `Your new verification code is: ${verificationCode}\n\nPlease enter this code to verify your email.`);

    return NextResponse.json({ success: true, message: 'Verification email resent' });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
