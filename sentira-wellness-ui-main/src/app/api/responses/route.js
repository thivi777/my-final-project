import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { protect } from '@/lib/authMiddleware';
import mongoose from 'mongoose';

function getResponseModel() {
  if (mongoose.models.Response) return mongoose.models.Response;
  const responseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [{ question: { type: String, required: true }, answer: { type: String, required: true } }],
    type: { type: String, enum: ['onboarding', 'checkin'], default: 'onboarding' },
    wellnessScore: { type: Number, default: 0 }
  }, { timestamps: true });
  return mongoose.model('Response', responseSchema);
}

// GET /api/responses
export async function GET(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Response = getResponseModel();
    const responses = await Response.find({ user: auth.user._id }).sort('-createdAt');
    return NextResponse.json({ success: true, count: responses.length, data: responses });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// POST /api/responses
export async function POST(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Response = getResponseModel();
    const { answers, wellnessScore, type } = await request.json();
    const response = new Response({ user: auth.user._id, answers, type: type || 'onboarding', wellnessScore: wellnessScore || 0 });
    await response.save();
    return NextResponse.json({ success: true, message: 'Response submitted successfully', data: response }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
