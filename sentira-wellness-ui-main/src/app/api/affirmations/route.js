import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { protect } from '@/lib/authMiddleware';
import mongoose from 'mongoose';

function getAffirmationModel() {
  if (mongoose.models.Affirmation) return mongoose.models.Affirmation;
  const affirmationSchema = new mongoose.Schema({
    text: { type: String, required: true, unique: true },
    author: { type: String, default: 'Anonymous' },
    category: { type: String, enum: ['Anxiety', 'Confidence', 'Self-Love', 'Focus', 'General'], default: 'General' },
    isActive: { type: Boolean, default: true }
  }, { timestamps: true });
  return mongoose.model('Affirmation', affirmationSchema);
}

// GET /api/affirmations - Admin: all affirmations
export async function GET(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Affirmation = getAffirmationModel();
    const affirmations = await Affirmation.find().sort('-createdAt');
    return NextResponse.json({ success: true, count: affirmations.length, data: affirmations });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// POST /api/affirmations - Admin: create affirmation
export async function POST(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Affirmation = getAffirmationModel();
    const body = await request.json();
    const affirmation = await Affirmation.create(body);
    return NextResponse.json({ success: true, data: affirmation }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
