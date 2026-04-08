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

export async function GET(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Goal = getGoalModel();
    const goals = await Goal.find({ user: auth.user._id }).sort('-createdAt');
    return NextResponse.json({ success: true, count: goals.length, data: goals });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Goal = getGoalModel();
    const body = await request.json();
    body.user = auth.user._id;
    const goal = await Goal.create(body);
    return NextResponse.json({ success: true, data: goal }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
