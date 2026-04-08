const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional for Google users
  role: { type: [String], enum: ['user', 'admin'], default: ['user',] }, // allows multiple roles
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  googleId: { type: String },
  facebookId: { type: String },
  appleId: { type: String },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  isPremium: { type: Boolean, default: false },
  subscriptionId: { type: String },
  subscriptionStatus: { type: String, enum: ['none', 'active', 'past_due', 'canceled', 'trialing'], default: 'none' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);