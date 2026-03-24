const mongoose = require('mongoose');

const affirmationSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add affirmation text'],
    unique: true
  },
  author: {
    type: String,
    default: 'Anonymous'
  },
  category: {
    type: String,
    enum: ['Anxiety', 'Confidence', 'Self-Love', 'Focus', 'General'],
    default: 'General'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Affirmation', affirmationSchema);
