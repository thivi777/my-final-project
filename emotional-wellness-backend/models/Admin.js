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
<<<<<<< HEAD
  resetPasswordExpire: Date
=======
  resetPasswordExpire: Date,
  googleId: { type: String }
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);