const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: [true, 'Please add an activity type'],
    enum: ['Meditation', 'Deep Breathing', 'Exercise', 'Yoga', 'Reading', 'Other'],
    default: 'Other'
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Please add duration in minutes']
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ['Planned', 'Completed', 'Cancelled'],
    default: 'Planned'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
