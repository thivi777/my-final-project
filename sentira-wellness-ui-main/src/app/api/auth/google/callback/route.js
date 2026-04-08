import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { createToken } from '@/lib/authMiddleware';
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

const ADMIN_WHITELIST = ['angelthivi9@gmail.com', 'thiviysa sathananthan'];

// GET /api/auth/google/callback
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(`${process.env.FRONTEND_URL}/login?error=google_auth_failed`);
  }

  try {
    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        grant_type: 'authorization_code',
      }),
    });
    const tokenData = await tokenRes.json();
    
    // Get user profile
    const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const profile = await profileRes.json();

    await connectDB();
    const User = getUserModel();
    const email = profile.email;
    
    let user = await User.findOne({ $or: [{ googleId: profile.id }, ...(email ? [{ email }] : [])] });
    let isNewUser = false;

    const isAdmin = ADMIN_WHITELIST.includes(email) || ADMIN_WHITELIST.includes(profile.name?.toLowerCase());

    if (!user) {
      isNewUser = true;
      user = await User.create({
        googleId: profile.id,
        name: profile.name,
        email: email || `google_${profile.id}@noemail.com`,
        role: isAdmin ? ['user', 'admin'] : ['user'],
        isVerified: true,
      });
    } else if (!user.googleId) {
      user.googleId = profile.id;
      if (isAdmin && !user.role.includes('admin')) user.role.push('admin');
      await user.save();
    }

    const token = createToken(user);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    return NextResponse.redirect(
      `${frontendUrl}/auth/callback?token=${token}&name=${encodeURIComponent(user.name)}&isNew=${isNewUser}`
    );
  } catch (err) {
    console.error('Google callback error:', err);
    return NextResponse.redirect(`${process.env.FRONTEND_URL}/login?error=google_auth_failed`);
  }
}
