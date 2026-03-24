const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { sendResponse } = require('../utils/responseHandler');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    return sendResponse(res, 200, true, 'Users fetched successfully', { count: users.length, users });
  } catch (err) {
    next(err);
  }
};

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }
    return sendResponse(res, 200, true, 'User profile fetched successfully', user);
  } catch (err) {
    next(err);
  }
};

// @desc    Get single user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }
    return sendResponse(res, 200, true, 'User fetched successfully', user);
  } catch (err) {
    next(err);
  }
};

// @desc    Update user profile (logged-in user)
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }

    const { name, email, password } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();
    return sendResponse(res, 200, true, 'Profile updated successfully', updatedUser);
  } catch (err) {
    next(err);
  }
};

// @desc    Update user (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res, next) => {
  try {
    const updates = req.body;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!updatedUser) {
      return sendResponse(res, 404, false, 'User not found');
    }

    return sendResponse(res, 200, true, 'User updated successfully', updatedUser);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }

    await user.deleteOne();
    return sendResponse(res, 200, true, 'User removed successfully');
  } catch (err) {
    next(err);
  }
};