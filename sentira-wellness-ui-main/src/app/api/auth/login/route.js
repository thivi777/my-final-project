import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import { createToken } from '@/lib/authMiddleware';
import mongoose from 'mongoose';

function getUserModel() {
  if (mongoose.models.User) return mongoose.models.User;
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: [String], enum: ['user', 'admin'], default: ['user'] },
    resetPasswordToken: String, resetPasswordExpire: Date,
    googleId: String, facebookId: String, appleId: String,
    isVerified: { type: Boolean, default: false }, verificationCode: String,
    isPremium: { type: Boolean, default: false }, subscriptionId: String,
    subscriptionStatus: { type: String, enum: ['none', 'active', 'past_due', 'canceled', 'trialing'], default: 'none' }
  }, { timestamps: true });
  return mongoose.model('User', userSchema);
}

// POST /api/auth/login
export async function POST(request) {
  await connectDB();
  const { email, password } = await request.json();
  try {
    const User = getUserModel();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 400 });

    if (user.password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 400 });
    }

    const token = createToken(user);
    const response = NextResponse.json({
      success: true, message: 'Login successful',
      data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role, isPremium: user.isPremium } }
    });
    response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600 });
    return response;
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
