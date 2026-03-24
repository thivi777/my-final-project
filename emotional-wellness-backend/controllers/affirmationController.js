const Affirmation = require('../models/Affirmation');

// @desc    Get random affirmation
// @route   GET /api/affirmations/random
// @access  Private
exports.getRandomAffirmation = async (req, res) => {
  try {
    const count = await Affirmation.countDocuments({ isActive: true });
    if (count === 0) {
      return res.status(404).json({ success: false, message: 'No affirmations found' });
    }

    const random = Math.floor(Math.random() * count);
    const affirmation = await Affirmation.findOne({ isActive: true }).skip(random);

    res.status(200).json({
      success: true,
      data: affirmation
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Get all affirmations (Admin only)
// @route   GET /api/affirmations
// @access  Private/Admin
exports.getAllAffirmations = async (req, res) => {
  try {
    const affirmations = await Affirmation.find().sort('-createdAt');
    res.status(200).json({
      success: true,
      count: affirmations.length,
      data: affirmations
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// @desc    Create new affirmation (Admin only)
// @route   POST /api/affirmations
// @access  Private/Admin
exports.createAffirmation = async (req, res) => {
  try {
    const affirmation = await Affirmation.create(req.body);
    res.status(201).json({ success: true, data: affirmation });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// @desc    Update affirmation (Admin only)
// @route   PUT /api/affirmations/:id
// @access  Private/Admin
exports.updateAffirmation = async (req, res) => {
  try {
    const affirmation = await Affirmation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!affirmation) {
      return res.status(404).json({ success: false, message: 'Affirmation not found' });
    }

    res.status(200).json({ success: true, data: affirmation });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// @desc    Delete affirmation (Admin only)
// @route   DELETE /api/affirmations/:id
// @access  Private/Admin
exports.deleteAffirmation = async (req, res) => {
  try {
    const affirmation = await Affirmation.findById(req.params.id);

    if (!affirmation) {
      return res.status(404).json({ success: false, message: 'Affirmation not found' });
    }

    await affirmation.deleteOne();
    res.status(200).json({ success: true, message: 'Affirmation removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};
