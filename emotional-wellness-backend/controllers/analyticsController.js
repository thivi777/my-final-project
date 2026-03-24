const MoodLog = require('../models/MoodLog');
const Activity = require('../models/Activity');
const Goal = require('../models/Goal');
const mongoose = require('mongoose');
const { sendResponse } = require('../utils/responseHandler');

// @desc    Get wellness analytics summary
// @route   GET /api/analytics/summary
// @access  Private
exports.getWellnessSummary = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // 1. Mood Trends (last 7 days)
    const moodTrends = await MoodLog.aggregate([
      { $match: { user: userId, createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          avgMood: { $avg: "$moodScore" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // 2. Activity Summary
    const activitySummary = await Activity.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // 3. Goal Progress
    const goalProgress = await Goal.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // 4. Common Triggers
    const commonTriggers = await MoodLog.aggregate([
      { $match: { user: userId, trigger: { $exists: true, $ne: "" } } },
      { $group: { _id: "$trigger", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    return sendResponse(res, 200, true, 'Analytics summary fetched successfully', {
      moodTrends,
      activitySummary,
      goalProgress,
      commonTriggers
    });
  } catch (err) {
    next(err);
  }
};
