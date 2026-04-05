const express = require('express');
const router = express.Router();
const { journalChat, generateJournalReflection } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/journal-chat', protect, journalChat);
router.post('/journal-reflection', protect, generateJournalReflection);

module.exports = router;
