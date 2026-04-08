import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { protect } from '@/lib/authMiddleware';
import mongoose from 'mongoose';

function getMoodLogModel() {
  if (mongoose.models.MoodLog) return mongoose.models.MoodLog;
  const moodLogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    moodScore: { type: Number, min: 1, max: 10, required: true },
    moodEmoji: String,
    tags: { type: [String], default: [] },
    trigger: String,
    note: String
  }, { timestamps: true });
  return mongoose.model('MoodLog', moodLogSchema);
}

export async function GET(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const MoodLog = getMoodLogModel();
    const moodLogs = await MoodLog.find({ user: auth.user._id }).sort('-createdAt');
    return NextResponse.json({ success: true, count: moodLogs.length, data: moodLogs });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const MoodLog = getMoodLogModel();
    const body = await request.json();
    body.user = auth.user._id;
    const moodLog = await MoodLog.create(body);
    return NextResponse.json({ success: true, data: moodLog }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
