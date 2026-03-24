const mongoose = require('mongoose');

const moodLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  moodScore: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Please add a mood score between 1 and 10']
  },
  moodEmoji: {
    type: String
  },
  tags: {
    type: [String],
    default: []
  },
  trigger: {
    type: String
  },
  note: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('MoodLog', moodLogSchema);
