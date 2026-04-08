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

// GET /api/analytics/summary
export async function GET(request) {
  await connectDB();
  const auth = await protect(request);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
  try {
    const MoodLog = getMoodLogModel();
    const Activity = getActivityModel();
    const Goal = getGoalModel();
    const userId = new mongoose.Types.ObjectId(auth.user._id);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [moodTrends, activitySummary, goalProgress, commonTriggers] = await Promise.all([
      MoodLog.aggregate([
        { $match: { user: userId, createdAt: { $gte: sevenDaysAgo } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, avgMood: { $avg: '$moodScore' } } },
        { $sort: { _id: 1 } }
      ]),
      Activity.aggregate([
        { $match: { user: userId } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Goal.aggregate([
        { $match: { user: userId } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      MoodLog.aggregate([
        { $match: { user: userId, trigger: { $exists: true, $ne: '' } } },
        { $group: { _id: '$trigger', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ])
    ]);

    return NextResponse.json({ success: true, message: 'Analytics summary fetched successfully', data: { moodTrends, activitySummary, goalProgress, commonTriggers } });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
