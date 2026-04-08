import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { protect } from '@/lib/authMiddleware';
import mongoose from 'mongoose';

function getJournalModel() {
  if (mongoose.models.Journal) return mongoose.models.Journal;
  const journalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: [true, 'Please add a title'] },
    content: { type: String, required: [true, 'Please add some content'] },
    mood: { type: String, enum: ['Happy', 'Sad', 'Anxious', 'Calm', 'Angry', 'Stressed', 'Energetic', 'Other'], default: 'Calm' },
    tags: [String],
    aiReflection: String,
    date: { type: Date, default: Date.now }
  }, { timestamps: true });
  return mongoose.model('Journal', journalSchema);
}

// GET /api/journals - Get all journals for user
export async function GET(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Journal = getJournalModel();
    const journals = await Journal.find({ user: auth.user._id }).sort('-date');
    return NextResponse.json({ success: true, count: journals.length, data: journals });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// POST /api/journals - Create journal
export async function POST(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Journal = getJournalModel();
    const body = await request.json();
    body.user = auth.user._id;
    const journal = await Journal.create(body);
    return NextResponse.json({ success: true, data: journal }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
