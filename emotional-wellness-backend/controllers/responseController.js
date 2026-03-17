const Response = require('../models/Response');

// @desc    Submit a new response (onboarding or wellness quiz)
// @route   POST /api/responses
// @access  Private
exports.submitResponse = async (req, res) => {
  try {
    const { answers, wellnessScore, type } = req.body;

    const response = new Response({
      user: req.user.id,
      answers,
      type: type || 'onboarding',
      wellnessScore: wellnessScore || 0
    });

    await response.save();

    res.status(201).json({
      success: true,
      message: 'Response submitted successfully',
      data: response
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Get all responses for the logged-in user
// @route   GET /api/responses
// @access  Private
exports.getUserResponses = async (req, res) => {
  try {
    const responses = await Response.find({ user: req.user.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: responses.length,
      data: responses
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Get a single response by ID
// @route   GET /api/responses/:id
// @access  Private
exports.getResponseById = async (req, res) => {
  try {
    const response = await Response.findById(req.params.id);

    if (!response) {
      return res.status(404).json({ success: false, message: 'Response not found' });
    }

    // Check ownership
    if (response.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to view this response' });
    }

    res.status(200).json({ success: true, data: response });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// @desc    Delete a response
// @route   DELETE /api/responses/:id
// @access  Private
exports.deleteResponse = async (req, res) => {
  try {
    const response = await Response.findById(req.params.id);

    if (!response) {
      return res.status(404).json({ success: false, message: 'Response not found' });
    }

    // Check ownership
    if (response.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this response' });
    }

    await response.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Response removed'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};
// @desc    Update a response
// @route   PUT /api/responses/:id
// @access  Private
exports.updateResponse = async (req, res) => {
  try {
    let response = await Response.findById(req.params.id);

    if (!response) {
      return res.status(404).json({ success: false, message: 'Response not found' });
    }

    // Check ownership
    if (response.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to update this response' });
    }

    response = await Response.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: response
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Get all responses (Admin only)
// @route   GET /api/responses/admin
// @access  Private/Admin
exports.getAllResponses = async (req, res) => {
  try {
    const responses = await Response.find().populate('user', 'name email').sort('-createdAt');

    res.status(200).json({
      success: true,
      count: responses.length,
      data: responses
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};
