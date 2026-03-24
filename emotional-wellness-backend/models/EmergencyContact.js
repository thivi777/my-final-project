const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add contact name']
  },
  phone: {
    type: String,
    required: [true, 'Please add contact phone number']
  },
  relationship: {
    type: String,
    required: [true, 'Please add relationship']
  },
  isPrimary: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);
