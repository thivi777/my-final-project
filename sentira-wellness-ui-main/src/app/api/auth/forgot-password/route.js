import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/db';
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

// POST /api/auth/forgot-password
export async function POST(request) {
  await connectDB();
  const { email } = await request.json();
  try {
    const User = getUserModel();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendEmail(user.email, 'Password Reset Token',
      `You requested a password reset. Please visit this link to reset your password:\n\n${resetUrl}\n\nThis link expires in 10 minutes.`);

    return NextResponse.json({ success: true, message: 'Email sent' });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
