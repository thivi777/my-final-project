import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { protect } from '@/lib/authMiddleware';
import mongoose from 'mongoose';

function getJournalModel() {
  if (mongoose.models.Journal) return mongoose.models.Journal;
  const journalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true }, content: { type: String, required: true },
    mood: { type: String, enum: ['Happy', 'Sad', 'Anxious', 'Calm', 'Angry', 'Stressed', 'Energetic', 'Other'], default: 'Calm' },
    tags: [String], aiReflection: String, date: { type: Date, default: Date.now }
  }, { timestamps: true });
  return mongoose.model('Journal', journalSchema);
}

// GET /api/journals/[id]
export async function GET(request, { params }) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Journal = getJournalModel();
    const journal = await Journal.findById((await params).id);
    if (!journal) return NextResponse.json({ success: false, message: 'Journal entry not found' }, { status: 404 });
    const roles = Array.isArray(auth.user.role) ? auth.user.role : [auth.user.role];
    if (journal.user.toString() !== String(auth.user._id) && !roles.includes('admin'))
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    return NextResponse.json({ success: true, data: journal });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// PUT /api/journals/[id]
export async function PUT(request, { params }) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Journal = getJournalModel();
    let journal = await Journal.findById((await params).id);
    if (!journal) return NextResponse.json({ success: false, message: 'Journal entry not found' }, { status: 404 });
    const roles = Array.isArray(auth.user.role) ? auth.user.role : [auth.user.role];
    if (journal.user.toString() !== String(auth.user._id) && !roles.includes('admin'))
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    const body = await request.json();
    journal = await Journal.findByIdAndUpdate((await params).id, body, { new: true, runValidators: true });
    return NextResponse.json({ success: true, data: journal });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// DELETE /api/journals/[id]
export async function DELETE(request, { params }) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const Journal = getJournalModel();
    const journal = await Journal.findById((await params).id);
    if (!journal) return NextResponse.json({ success: false, message: 'Journal entry not found' }, { status: 404 });
    const roles = Array.isArray(auth.user.role) ? auth.user.role : [auth.user.role];
    if (journal.user.toString() !== String(auth.user._id) && !roles.includes('admin'))
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    await journal.deleteOne();
    return NextResponse.json({ success: true, message: 'Journal entry removed' });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
