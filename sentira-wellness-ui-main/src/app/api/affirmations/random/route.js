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

// GET /api/affirmations/random
export async function GET(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Affirmation = getAffirmationModel();
    const count = await Affirmation.countDocuments({ isActive: true });
    if (count === 0) return NextResponse.json({ success: false, message: 'No affirmations found' }, { status: 404 });
    const random = Math.floor(Math.random() * count);
    const affirmation = await Affirmation.findOne({ isActive: true }).skip(random);
    return NextResponse.json({ success: true, data: affirmation });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
