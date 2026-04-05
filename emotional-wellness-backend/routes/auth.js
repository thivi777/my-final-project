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
<<<<<<< HEAD
  resetPassword 
} = require('../controllers/authcontroller');  // make sure all functions are exported

=======
  resetPassword,
  verifyEmail,
  resendVerificationEmail
} = require('../controllers/authcontroller');  // make sure all functions are exported

const { protect } = require('../middleware/authMiddleware');

>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
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

<<<<<<< HEAD
=======
router.post('/verify-email', protect, verifyEmail);
router.post('/resend-verification', protect, resendVerificationEmail);

>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
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
<<<<<<< HEAD

    res.json({
      message: 'User Google login successful',
      token,
      user: req.user
    });
=======
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
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
  }
);

module.exports = router;