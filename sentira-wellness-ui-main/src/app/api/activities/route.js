import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { protect } from '@/lib/authMiddleware';
import mongoose from 'mongoose';

function getActivityModel() {
  if (mongoose.models.Activity) return mongoose.models.Activity;
  const activitySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ['Meditation', 'Deep Breathing', 'Exercise', 'Yoga', 'Reading', 'Journaling', 'Other'], default: 'Other' },
    duration: { type: Number, required: true },
    notes: String,
    status: { type: String, enum: ['Planned', 'Completed', 'Cancelled'], default: 'Planned' },
    date: { type: Date, default: Date.now }
  }, { timestamps: true });
  return mongoose.model('Activity', activitySchema);
}

export async function GET(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Activity = getActivityModel();
    const activities = await Activity.find({ user: auth.user._id }).sort('-date');
    return NextResponse.json({ success: true, count: activities.length, data: activities });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Activity = getActivityModel();
    const body = await request.json();
    body.user = auth.user._id;
    const activity = await Activity.create(body);
    return NextResponse.json({ success: true, data: activity }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
