const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String,         // ← string, not array
    enum: ["user", "admin"],
    default: "admin"      // default admin role
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  googleId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);