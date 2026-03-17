const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title']
  },
  content: {
    type: String,
    required: [true, 'Please add some content']
  },
  mood: {
    type: String,
    enum: ['Happy', 'Sad', 'Anxious', 'Calm', 'Angry', 'Stressed', 'Energetic', 'Other'],
    default: 'Calm'
  },
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Journal', journalSchema);
