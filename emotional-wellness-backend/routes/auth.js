const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { check } = require('express-validator');
const { validate } = require('../middleware/validation');

const { 
  register, 
  login, 
  logout, 
  forgotPassword, 
  resetPassword 
} = require('../controllers/authcontroller');  // make sure all functions are exported

// ----- Local authentication routes -----
router.post(
  '/register', 
  validate([
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ]),
  register
);

router.post(
  '/login', 
  validate([
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ]),
  login
);

router.post('/logout', logout);

// Use PUT for reset-password because it updates the password
router.post(
  '/forgot-password', 
  validate([
    check('email', 'Please include a valid email').isEmail()
  ]),
  forgotPassword
);

router.put(
  '/reset-password/:token', 
  validate([
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ]),
  resetPassword
);

// ----- Google OAuth routes -----

// Step 1 → Redirect user to Google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Step 2 → Google callback
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'User Google login successful',
      token,
      user: req.user
    });
  }
);

module.exports = router;