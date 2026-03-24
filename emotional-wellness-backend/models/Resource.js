const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a resource title']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Anxiety', 'Sleep', 'Focus', 'Stress', 'Relationships', 'Mindfulness', 'General'],
    default: 'General'
  },
  content: {
    type: String,
    required: [true, 'Please add the content or description']
  },
  mediaUrl: {
    type: String
  },
  tags: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
