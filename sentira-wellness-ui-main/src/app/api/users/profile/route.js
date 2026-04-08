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

function getResponseModel() {
  if (mongoose.models.Response) return mongoose.models.Response;
  const responseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [{ question: String, answer: String }],
    type: { type: String, enum: ['onboarding', 'checkin'], default: 'onboarding' },
    wellnessScore: { type: Number, default: 0 }
  }, { timestamps: true });
  return mongoose.model('Response', responseSchema);
}

// GET /api/users/profile
export async function GET(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const User = getUserModel();
    const Response = getResponseModel();
    const user = await User.findById(auth.user._id).select('-password').lean();
    if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    const onboardingResponse = await Response.findOne({ user: auth.user._id, type: 'onboarding' });
    user.onboardingCompleted = !!onboardingResponse;
    return NextResponse.json({ success: true, message: 'User profile fetched successfully', data: user });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// PUT /api/users/profile
export async function PUT(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const User = getUserModel();
    const user = await User.findById(auth.user._id);
    if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    const { name, email, password } = await request.json();
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    const updatedUser = await user.save();
    return NextResponse.json({ success: true, message: 'Profile updated successfully', data: updatedUser });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
