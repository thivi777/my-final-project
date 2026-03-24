const express = require('express');
const router = express.Router();
const {
  createMoodLog,
  getMoodLogs,
  getMoodLogById,
  updateMoodLog,
  deleteMoodLog
} = require('../controllers/moodLogController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .post(createMoodLog)
  .get(getMoodLogs);

router.route('/:id')
  .get(getMoodLogById)
  .put(updateMoodLog)
  .delete(deleteMoodLog);

module.exports = router;
