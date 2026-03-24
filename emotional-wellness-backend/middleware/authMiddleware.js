const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer') 
    ? authHeader.split(' ')[1] 
    : req.cookies?.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    
    // Check both models
    let user = await User.findById(decoded.id).select('-password');
    if (!user) {
      user = await Admin.findById(decoded.id).select('-password');
      console.log('Found in Admin collection:', user ? 'Yes' : 'No');
    } else {
      console.log('Found in User collection:', user ? 'Yes' : 'No');
    }

    if (!user) {
      console.log('User not found for ID:', decoded.id);
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};

// Role-based authorization
exports.authorize = (...roles) => (req, res, next) => {
  console.log('Authorizing roles:', roles, 'User role:', req?.user?.role);
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }

  const userRoles = Array.isArray(req.user.role) ? req.user.role : [req.user.role];
  
  if (!roles.some(role => userRoles.includes(role))) {
    console.log('Access Denied: Role mismatch');
    return res.status(403).json({ 
      success: false, 
      message: `User role '${req.user.role}' is not authorized to access this route` 
    });
  }
  next();
};