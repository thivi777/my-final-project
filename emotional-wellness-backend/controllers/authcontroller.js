const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { createToken } = require('../utils/token');

// ---------------- REGISTER USER ----------------
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

   const user = new User({
  name,
  email,
  password: hashedPassword,
  role: 'user'
});
    await user.save();

    const token = createToken(user);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ---------------- LOGIN USER ----------------
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    if (user.password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user);

    res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 3600000 });
    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ---------------- LOGOUT ----------------
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

// ---------------- FORGOT PASSWORD ----------------
exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();

  console.log(`Reset token for ${user.email}: ${resetToken}`);

  res.json({
    message: 'Reset token generated. Check server console for token.',
    resetToken
  });
};

// ---------------- RESET PASSWORD ----------------
exports.resetPassword = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  res.json({ message: 'Password reset successful' });
};

// ---------------- GOOGLE CALLBACK ----------------
exports.googleCallback = (req, res) => {
  const token = createToken(req.user);
  res.cookie('token', token, { httpOnly: true, secure: false });
  res.json({ message: 'Google login successful', token });
};