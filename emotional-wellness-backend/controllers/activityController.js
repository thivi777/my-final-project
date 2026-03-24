const Activity = require('../models/Activity');

// @desc    Create new activity
// @route   POST /api/activities
// @access  Private
exports.createActivity = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const activity = await Activity.create(req.body);

    res.status(201).json({
      success: true,
      data: activity
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Get all activities for user
// @route   GET /api/activities
// @access  Private
exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.id }).sort('-date');

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Get single activity
// @route   GET /api/activities/:id
// @access  Private
exports.getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    // Check ownership
    if (activity.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({ success: true, data: activity });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// @desc    Update activity
// @route   PUT /api/activities/:id
// @access  Private
exports.updateActivity = async (req, res) => {
  try {
    let activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    // Check ownership
    if (activity.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: activity });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// @desc    Delete activity
// @route   DELETE /api/activities/:id
// @access  Private
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    // Check ownership
    if (activity.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    await activity.deleteOne();

    res.status(200).json({ success: true, message: 'Activity removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};
