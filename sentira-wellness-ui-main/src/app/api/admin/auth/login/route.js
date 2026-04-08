import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import { createToken } from '@/lib/authMiddleware';
import mongoose from 'mongoose';

function getAdminModel() {
  if (mongoose.models.Admin) return mongoose.models.Admin;
  const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'admin' },
    resetPasswordToken: String, resetPasswordExpire: Date, googleId: String
  }, { timestamps: true });
  return mongoose.model('Admin', adminSchema);
}

// POST /api/admin/auth/login
export async function POST(request) {
  await connectDB();
  const { email, password } = await request.json();
  try {
    const Admin = getAdminModel();
    const admin = await Admin.findOne({ email });
    if (!admin) return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });

    const token = createToken(admin);
    const response = NextResponse.json({
      message: 'Admin login successful', token,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
    });
    response.cookies.set('token', token, { httpOnly: true, maxAge: 3600 });
    return response;
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
