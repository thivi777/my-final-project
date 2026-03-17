const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Role-based authorization
exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.some(role => req.user.role.includes(role))) {
    return res.status(403).json({ message: `User role '${req.user.role}' not allowed` });
  }
  next();
};