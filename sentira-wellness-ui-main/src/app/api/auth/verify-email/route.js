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

// POST /api/auth/verify-email
export async function POST(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  const { code } = await request.json();
  try {
    const User = getUserModel();
    const user = await User.findById(auth.user._id);
    if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    if (user.isVerified) return NextResponse.json({ success: false, message: 'User already verified' }, { status: 400 });
    if (user.verificationCode !== code) return NextResponse.json({ success: false, message: 'Invalid verification code' }, { status: 400 });

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();
    return NextResponse.json({ success: true, message: 'Email verified successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
