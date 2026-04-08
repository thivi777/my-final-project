const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

const { 
  register, 
  login, 
  logout, 
  forgotPassword, 
  resetPassword,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin
} = require('../controllers/adminAuthcontroller');

// ----- Local authentication routes -----
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Password reset routes
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

// ----- Google OAuth routes -----

// Step 1 → Redirect user to Google
router.get(
  '/google',
  passport.authenticate('admin-google', { scope: ['profile', 'email'] })
);

// Step 2 → Google callback
router.get(
  '/google/callback',
  passport.authenticate('admin-google', { session: false }),
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
    res.redirect(`${frontendUrl}/admin/auth/callback?token=${token}&name=${encodeURIComponent(req.user.name)}`);
  }
);

// ----- Admin CRUD routes (Protected) -----
router.use(protect);
router.use(authorize('admin'));

router.route('/admins')
  .get(getAllAdmins);

router.route('/admins/:id')
  .get(getAdminById)
  .put(updateAdmin)
  .delete(deleteAdmin);


module.exports = router;