const express = require('express');
const router = express.Router();
const {
  submitResponse,
  getUserResponses,
  getResponseById,
  deleteResponse,
  getAllResponses,
  updateResponse
} = require('../controllers/responseController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

// Admin only route
router.get('/admin', authorize('admin'), getAllResponses);

router.route('/')
  .post(submitResponse)
  .get(getUserResponses);

router.route('/:id')
  .get(getResponseById)
  .put(updateResponse)
  .delete(deleteResponse);

module.exports = router;
