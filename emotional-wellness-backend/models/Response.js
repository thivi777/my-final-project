const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true }
    }
  ],
  type: {
    type: String,
    enum: ['onboarding', 'checkin'],
    default: 'onboarding'
  },
  wellnessScore: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Response', responseSchema);
