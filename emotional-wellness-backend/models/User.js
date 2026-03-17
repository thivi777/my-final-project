const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional for Google users
  role: { type: [String], enum: ['user', 'admin'], default: ['user',] }, // allows multiple roles
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  googleId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);