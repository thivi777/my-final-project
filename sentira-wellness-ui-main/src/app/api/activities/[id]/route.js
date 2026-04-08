import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { protect } from '@/lib/authMiddleware';
import mongoose from 'mongoose';

function getActivityModel() {
  if (mongoose.models.Activity) return mongoose.models.Activity;
  const activitySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ['Meditation', 'Deep Breathing', 'Exercise', 'Yoga', 'Reading', 'Journaling', 'Other'], default: 'Other' },
    duration: { type: Number, required: true }, notes: String,
    status: { type: String, enum: ['Planned', 'Completed', 'Cancelled'], default: 'Planned' },
    date: { type: Date, default: Date.now }
  }, { timestamps: true });
  return mongoose.model('Activity', activitySchema);
}

async function checkOwner(doc, auth) {
  const roles = Array.isArray(auth.user.role) ? auth.user.role : [auth.user.role];
  return doc.user.toString() === String(auth.user._id) || roles.includes('admin');
}

export async function GET(request, { params }) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Activity = getActivityModel();
    const activity = await Activity.findById((await params).id);
    if (!activity) return NextResponse.json({ success: false, message: 'Activity not found' }, { status: 404 });
    if (!await checkOwner(activity, auth)) return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    return NextResponse.json({ success: true, data: activity });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Activity = getActivityModel();
    let activity = await Activity.findById((await params).id);
    if (!activity) return NextResponse.json({ success: false, message: 'Activity not found' }, { status: 404 });
    if (!await checkOwner(activity, auth)) return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    const body = await request.json();
    activity = await Activity.findByIdAndUpdate((await params).id, body, { new: true, runValidators: true });
    return NextResponse.json({ success: true, data: activity });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Activity = getActivityModel();
    const activity = await Activity.findById((await params).id);
    if (!activity) return NextResponse.json({ success: false, message: 'Activity not found' }, { status: 404 });
    if (!await checkOwner(activity, auth)) return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    await activity.deleteOne();
    return NextResponse.json({ success: true, message: 'Activity removed' });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
