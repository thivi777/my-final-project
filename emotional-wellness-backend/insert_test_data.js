const mongoose = require('mongoose');
const MoodLog = require('./models/MoodLog');
const Goal = require('./models/Goal');
const Journal = require('./models/Journal');

const userId = '69c0c2b0e0db5a9533b24392';

async function insertData() {
  await mongoose.connect('mongodb://localhost:27017/sentira');
  
  // Clean up existing test data for this user to avoid duplicates if re-running
  await MoodLog.deleteMany({ user: userId });
  await Goal.deleteMany({ user: userId });
  await Journal.deleteMany({ user: userId });

  // Insert Moods
  await MoodLog.create([
    { user: userId, moodScore: 8, moodEmoji: '😊', note: 'Feeling great after integration!' },
    { user: userId, moodScore: 5, moodEmoji: '😐', note: 'Productive morning.' },
    { user: userId, moodScore: 9, moodEmoji: '🌟', note: 'Lunch was delicious.' }
  ]);

  // Insert Goals
  await Goal.create([
    { user: userId, title: 'Drink 2L Water', description: 'Stay hydrated throughout the day.', targetDate: new Date('2026-03-23'), priority: 'High' },
    { user: userId, title: 'Meditation', description: '10 mins of mindfulness.', targetDate: new Date('2026-03-24'), priority: 'Medium' }
  ]);

  // Insert Journals
  await Journal.create([
    { user: userId, title: 'Integration Success', content: 'The Axios integration is working perfectly.', mood: 'Happy' },
    { user: userId, title: 'Daily Reflection', content: 'Today was a good day of progress.', mood: 'Calm' }
  ]);

  console.log('Test data inserted successfully!');
  process.exit(0);
}

insertData().catch(err => {
  console.error(err);
  process.exit(1);
});
