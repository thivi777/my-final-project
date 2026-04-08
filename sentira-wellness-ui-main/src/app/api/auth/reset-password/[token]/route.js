import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import { protect } from '@/lib/authMiddleware';
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

// PUT /api/auth/reset-password/[token]
export async function PUT(request, { params }) {
  await connectDB();
  const { token } = await params;
  const { password } = await request.json();
  try {
    const User = getUserModel();
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });
    if (!user) return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 400 });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return NextResponse.json({ success: true, message: 'Password reset successful' });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
