const express = require('express');
const router = express.Router();
const {
  getRandomAffirmation,
  getAllAffirmations,
  createAffirmation,
  updateAffirmation,
  deleteAffirmation
} = require('../controllers/affirmationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

// Public route for all users
router.get('/random', getRandomAffirmation);

// Admin-only routes
router.use(authorize('admin'));
router.route('/')
  .get(getAllAffirmations)
  .post(createAffirmation);

router.route('/:id')
  .put(updateAffirmation)
  .delete(deleteAffirmation);

module.exports = router;
