import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { protect } from '@/lib/authMiddleware';
import mongoose from 'mongoose';

function getGoalModel() {
  if (mongoose.models.Goal) return mongoose.models.Goal;
  const goalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true }, description: String,
    targetDate: { type: Date, required: true }, achievedDate: Date,
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' }
  }, { timestamps: true });
  return mongoose.model('Goal', goalSchema);
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
    const Goal = getGoalModel();
    const goal = await Goal.findById((await params).id);
    if (!goal) return NextResponse.json({ success: false, message: 'Goal not found' }, { status: 404 });
    if (!await checkOwner(goal, auth)) return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    return NextResponse.json({ success: true, data: goal });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Goal = getGoalModel();
    let goal = await Goal.findById((await params).id);
    if (!goal) return NextResponse.json({ success: false, message: 'Goal not found' }, { status: 404 });
    if (!await checkOwner(goal, auth)) return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    const body = await request.json();
    goal = await Goal.findByIdAndUpdate((await params).id, body, { new: true, runValidators: true });
    return NextResponse.json({ success: true, data: goal });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Goal = getGoalModel();
    const goal = await Goal.findById((await params).id);
    if (!goal) return NextResponse.json({ success: false, message: 'Goal not found' }, { status: 404 });
    if (!await checkOwner(goal, auth)) return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    await goal.deleteOne();
    return NextResponse.json({ success: true, message: 'Goal removed' });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
