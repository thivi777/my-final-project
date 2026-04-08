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
  resetPassword,
  verifyEmail,
  resendVerificationEmail
} = require('../controllers/authcontroller');  // make sure all functions are exported

const { protect } = require('../middleware/authMiddleware');

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

// ----- Password reset routes -----
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

// ----- Email verification routes -----
router.post('/verify-email', protect, verifyEmail);
router.post('/resend-verification', protect, resendVerificationEmail);

// ----- Google OAuth routes -----
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000 
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const isNew = req.user.isNewUser ? 'true' : 'false';
    res.redirect(`${frontendUrl}/auth/callback?token=${token}&name=${encodeURIComponent(req.user.name)}&isNew=${isNew}`);
  }
);

// ----- Facebook OAuth routes -----
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000 
    });
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const isNew = req.user.isNewUser ? 'true' : 'false';
    res.redirect(`${frontendUrl}/auth/callback?token=${token}&name=${encodeURIComponent(req.user.name)}&isNew=${isNew}`);
  }
);

// ----- Apple OAuth routes -----
router.get(
  '/apple',
  passport.authenticate('apple')
);

router.post(
  '/apple/callback',
  (req, res, next) => {
    passport.authenticate('apple', { session: false }, (err, user) => {
      if (err || !user) {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        return res.redirect(`${frontendUrl}/login?error=apple_auth_failed`);
      }
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.cookie('token', token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000 
      });
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const isNew = user.isNewUser ? 'true' : 'false';
      return res.redirect(`${frontendUrl}/auth/callback?token=${token}&name=${encodeURIComponent(user.name)}&isNew=${isNew}`);
    })(req, res, next);
  }
);

module.exports = router;