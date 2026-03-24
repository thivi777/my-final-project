const Goal = require('../models/Goal');

// @desc    Create new goal
// @route   POST /api/goals
// @access  Private
exports.createGoal = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const goal = await Goal.create(req.body);

    res.status(201).json({
      success: true,
      data: goal
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Get all goals for user
// @route   GET /api/goals
// @access  Private
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: goals.length,
      data: goals
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Get single goal
// @route   GET /api/goals/:id
// @access  Private
exports.getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ success: false, message: 'Goal not found' });
    }

    // Check ownership
    if (goal.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({ success: true, data: goal });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
exports.updateGoal = async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ success: false, message: 'Goal not found' });
    }

    // Check ownership
    if (goal.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: goal });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ success: false, message: 'Goal not found' });
    }

    // Check ownership
    if (goal.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    await goal.deleteOne();

    res.status(200).json({ success: true, message: 'Goal removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};
