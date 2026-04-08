const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { createToken } = require('../utils/token');
const { sendResponse } = require('../utils/responseHandler');
const { sendEmail } = require('../utils/sendEmail');

// ---------------- REGISTER USER ----------------
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, 400, false, 'User already exists');
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    const verificationCode = crypto.randomInt(100000, 999999).toString();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user',
      isVerified: false,
      verificationCode
    });
    
    await user.save();
    
    try {
      const message = `Welcome to Sentira Wellness!\n\nYour verification code is: ${verificationCode}\n\nPlease enter this code in the onboarding screen to verify your email.`;
      await sendEmail(user.email, 'Your Verification Code', message);
    } catch (err) {
      console.error('Error sending verification email:', err);
      // We can still proceed even if email fails, but maybe log it.
    }

    const token = createToken(user);

    return sendResponse(res, 201, true, 'User registered successfully', {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
};

// ---------------- LOGIN USER ----------------
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 400, false, 'Invalid credentials');
    }

    if (user.password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return sendResponse(res, 400, false, 'Invalid credentials');
      }
    }

    const token = createToken(user);

    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 3600000 
    });

    return sendResponse(res, 200, true, 'Login successful', {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    next(error);
  }
};

// ---------------- LOGOUT ----------------
exports.logout = (req, res) => {
  res.clearCookie('token');
  return sendResponse(res, 200, true, 'Logged out successfully');
};

// ---------------- FORGOT PASSWORD ----------------
exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      await sendEmail(user.email, 'Password Reset Token', message);
      return sendResponse(res, 200, true, 'Email sent');
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return sendResponse(res, 500, false, 'Email could not be sent');
    }
  } catch (err) {
    next(err);
  }
};

// ---------------- RESET PASSWORD ----------------
exports.resetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return sendResponse(res, 400, false, 'Invalid or expired token');
    }

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return sendResponse(res, 200, true, 'Password reset successful');
  } catch (err) {
    next(err);
  }
};

// ---------------- GOOGLE CALLBACK ----------------
exports.googleCallback = (req, res) => {
  const token = createToken(req.user);
  res.cookie('token', token, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production' 
  });
  
  // Redirect to frontend callback route with token and user info
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  res.redirect(`${frontendUrl}/auth/callback?token=${token}&name=${encodeURIComponent(req.user.name)}`);
};

// ---------------- VERIFY EMAIL ----------------
exports.verifyEmail = async (req, res, next) => {
  const { code } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }
    
    if (user.isVerified) {
      return sendResponse(res, 400, false, 'User already verified');
    }

    if (user.verificationCode !== code) {
      return sendResponse(res, 400, false, 'Invalid verification code');
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

    return sendResponse(res, 200, true, 'Email verified successfully');
  } catch (err) {
    next(err);
  }
};

// ---------------- RESEND VERIFICATION EMAIL ----------------
exports.resendVerificationEmail = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }

    if (user.isVerified) {
      return sendResponse(res, 400, false, 'User already verified');
    }

    const verificationCode = crypto.randomInt(100000, 999999).toString();
    user.verificationCode = verificationCode;
    await user.save();

    const message = `Your new verification code is: ${verificationCode}\n\nPlease enter this code in the onboarding screen to verify your email.`;
    await sendEmail(user.email, 'Your New Verification Code', message);

    return sendResponse(res, 200, true, 'Verification email resent');
  } catch (err) {
    next(err);
  }
};