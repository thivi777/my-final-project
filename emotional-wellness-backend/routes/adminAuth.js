const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { 
  register, 
  login, 
  logout, 
  forgotPassword, 
  resetPassword 
} = require('../controllers/adminAuthcontroller');  // make sure all functions are exported

// ----- Local authentication routes -----
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Use PUT for reset-password because it updates the password
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

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