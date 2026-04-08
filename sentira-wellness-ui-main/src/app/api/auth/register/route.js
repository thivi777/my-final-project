import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import connectDB from '@/lib/db';
import { protect, createToken } from '@/lib/authMiddleware';
import { sendEmail } from '@/lib/sendEmail';
import mongoose from 'mongoose';

function getUserModel() {
  if (mongoose.models.User) return mongoose.models.User;
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: [String], enum: ['user', 'admin'], default: ['user'] },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    googleId: String,
    facebookId: String,
    appleId: String,
    isVerified: { type: Boolean, default: false },
    verificationCode: String,
    isPremium: { type: Boolean, default: false },
    subscriptionId: String,
    subscriptionStatus: { type: String, enum: ['none', 'active', 'past_due', 'canceled', 'trialing'], default: 'none' }
  }, { timestamps: true });
  return mongoose.model('User', userSchema);
}

// POST /api/auth/register
export async function POST(request) {
  await connectDB();
  const { name, email, password } = await request.json();

  try {
    const User = getUserModel();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    const verificationCode = crypto.randomInt(100000, 999999).toString();

    const user = new User({ name, email, password: hashedPassword, role: ['user'], isVerified: false, verificationCode });
    await user.save();

    try {
      await sendEmail(user.email, 'Your Verification Code',
        `Welcome to Sentira Wellness!\n\nYour verification code is: ${verificationCode}\n\nPlease enter this code to verify your email.`);
    } catch (e) { console.error('Email error:', e); }

    const token = createToken(user);
    return NextResponse.json({
      success: true, message: 'User registered successfully',
      data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
