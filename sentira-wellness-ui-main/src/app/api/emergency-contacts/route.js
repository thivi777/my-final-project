import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { protect } from '@/lib/authMiddleware';
import mongoose from 'mongoose';

function getEmergencyContactModel() {
  if (mongoose.models.EmergencyContact) return mongoose.models.EmergencyContact;
  const emergencyContactSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    relationship: { type: String, required: true },
    isPrimary: { type: Boolean, default: false }
  }, { timestamps: true });
  return mongoose.model('EmergencyContact', emergencyContactSchema);
}

export async function GET(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const EmergencyContact = getEmergencyContactModel();
    const contacts = await EmergencyContact.find({ user: auth.user._id }).sort('-createdAt');
    return NextResponse.json({ success: true, message: 'Emergency contacts fetched', data: { count: contacts.length, contacts } });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const EmergencyContact = getEmergencyContactModel();
    const body = await request.json();
    body.user = auth.user._id;
    const contact = await EmergencyContact.create(body);
    return NextResponse.json({ success: true, message: 'Emergency contact created', data: contact }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
