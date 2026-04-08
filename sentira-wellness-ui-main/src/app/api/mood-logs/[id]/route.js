import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { protect } from '@/lib/authMiddleware';
import mongoose from 'mongoose';

function getMoodLogModel() {
  if (mongoose.models.MoodLog) return mongoose.models.MoodLog;
  const moodLogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    moodScore: { type: Number, min: 1, max: 10, required: true },
    moodEmoji: String, tags: { type: [String], default: [] }, trigger: String, note: String
  }, { timestamps: true });
  return mongoose.model('MoodLog', moodLogSchema);
}

async function checkOwner(moodLog, auth) {
  const roles = Array.isArray(auth.user.role) ? auth.user.role : [auth.user.role];
  return moodLog.user.toString() === String(auth.user._id) || roles.includes('admin');
}

export async function GET(request, { params }) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const MoodLog = getMoodLogModel();
    const moodLog = await MoodLog.findById((await params).id);
    if (!moodLog) return NextResponse.json({ success: false, message: 'Mood log not found' }, { status: 404 });
    if (!await checkOwner(moodLog, auth)) return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    return NextResponse.json({ success: true, data: moodLog });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const MoodLog = getMoodLogModel();
    let moodLog = await MoodLog.findById((await params).id);
    if (!moodLog) return NextResponse.json({ success: false, message: 'Mood log not found' }, { status: 404 });
    if (!await checkOwner(moodLog, auth)) return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    const body = await request.json();
    moodLog = await MoodLog.findByIdAndUpdate((await params).id, body, { new: true, runValidators: true });
    return NextResponse.json({ success: true, data: moodLog });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const MoodLog = getMoodLogModel();
    const moodLog = await MoodLog.findById((await params).id);
    if (!moodLog) return NextResponse.json({ success: false, message: 'Mood log not found' }, { status: 404 });
    if (!await checkOwner(moodLog, auth)) return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    await moodLog.deleteOne();
    return NextResponse.json({ success: true, message: 'Mood log removed' });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
