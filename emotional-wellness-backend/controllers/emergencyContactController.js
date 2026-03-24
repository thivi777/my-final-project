const EmergencyContact = require('../models/EmergencyContact');
const { sendResponse } = require('../utils/responseHandler');

// @desc    Create new emergency contact
// @route   POST /api/emergency-contacts
// @access  Private
exports.createEmergencyContact = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const contact = await EmergencyContact.create(req.body);

    return sendResponse(res, 201, true, 'Emergency contact created successfully', contact);
  } catch (err) {
    next(err);
  }
};

// @desc    Get all emergency contacts for user
// @route   GET /api/emergency-contacts
// @access  Private
exports.getEmergencyContacts = async (req, res, next) => {
  try {
    const contacts = await EmergencyContact.find({ user: req.user.id }).sort('-createdAt');

    return sendResponse(res, 200, true, 'Emergency contacts fetched successfully', {
      count: contacts.length,
      contacts
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single emergency contact
// @route   GET /api/emergency-contacts/:id
// @access  Private
exports.getEmergencyContactById = async (req, res, next) => {
  try {
    const contact = await EmergencyContact.findById(req.params.id);

    if (!contact) {
      return sendResponse(res, 404, false, 'Emergency contact not found');
    }

    // Check ownership
    if (contact.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return sendResponse(res, 401, false, 'Not authorized');
    }

    return sendResponse(res, 200, true, 'Emergency contact fetched successfully', contact);
  } catch (err) {
    next(err);
  }
};

// @desc    Update emergency contact
// @route   PUT /api/emergency-contacts/:id
// @access  Private
exports.updateEmergencyContact = async (req, res, next) => {
  try {
    let contact = await EmergencyContact.findById(req.params.id);

    if (!contact) {
      return sendResponse(res, 404, false, 'Emergency contact not found');
    }

    // Check ownership
    if (contact.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return sendResponse(res, 401, false, 'Not authorized');
    }

    contact = await EmergencyContact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    return sendResponse(res, 200, true, 'Emergency contact updated successfully', contact);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete emergency contact
// @route   DELETE /api/emergency-contacts/:id
// @access  Private
exports.deleteEmergencyContact = async (req, res, next) => {
  try {
    const contact = await EmergencyContact.findById(req.params.id);

    if (!contact) {
      return sendResponse(res, 404, false, 'Emergency contact not found');
    }

    // Check ownership
    if (contact.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return sendResponse(res, 401, false, 'Not authorized');
    }

    await contact.deleteOne();

    return sendResponse(res, 200, true, 'Emergency contact removed successfully');
  } catch (err) {
    next(err);
  }
};
