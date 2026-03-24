const MoodLog = require('../models/MoodLog');

// @desc    Create new mood log
// @route   POST /api/mood-logs
// @access  Private
exports.createMoodLog = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const moodLog = await MoodLog.create(req.body);

    res.status(201).json({
      success: true,
      data: moodLog
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Get all mood logs for user
// @route   GET /api/mood-logs
// @access  Private
exports.getMoodLogs = async (req, res) => {
  try {
    const moodLogs = await MoodLog.find({ user: req.user.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: moodLogs.length,
      data: moodLogs
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Get single mood log
// @route   GET /api/mood-logs/:id
// @access  Private
exports.getMoodLogById = async (req, res) => {
  try {
    const moodLog = await MoodLog.findById(req.params.id);

    if (!moodLog) {
      return res.status(404).json({ success: false, message: 'Mood log not found' });
    }

    // Check ownership
    if (moodLog.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({ success: true, data: moodLog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// @desc    Update mood log
// @route   PUT /api/mood-logs/:id
// @access  Private
exports.updateMoodLog = async (req, res) => {
  try {
    let moodLog = await MoodLog.findById(req.params.id);

    if (!moodLog) {
      return res.status(404).json({ success: false, message: 'Mood log not found' });
    }

    // Check ownership
    if (moodLog.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    moodLog = await MoodLog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: moodLog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// @desc    Delete mood log
// @route   DELETE /api/mood-logs/:id
// @access  Private
exports.deleteMoodLog = async (req, res) => {
  try {
    const moodLog = await MoodLog.findById(req.params.id);

    if (!moodLog) {
      return res.status(404).json({ success: false, message: 'Mood log not found' });
    }

    // Check ownership
    if (moodLog.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    await moodLog.deleteOne();

    res.status(200).json({ success: true, message: 'Mood log removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};
