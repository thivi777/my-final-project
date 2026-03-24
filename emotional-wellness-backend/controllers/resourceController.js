const Resource = require('../models/Resource');

// @desc    Create new resource
// @route   POST /api/resources
// @access  Private/Admin
exports.createResource = async (req, res) => {
  try {
    req.body.admin = req.user.id;
    const resource = await Resource.create(req.body);

    res.status(201).json({
      success: true,
      data: resource
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Get all resources
// @route   GET /api/resources
// @access  Private
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort('-createdAt');

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Get single resource
// @route   GET /api/resources/:id
// @access  Private
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    res.status(200).json({ success: true, data: resource });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// @desc    Update resource
// @route   PUT /api/resources/:id
// @access  Private/Admin
exports.updateResource = async (req, res) => {
  try {
    let resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: resource });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private/Admin
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    await resource.deleteOne();

    res.status(200).json({ success: true, message: 'Resource removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};
