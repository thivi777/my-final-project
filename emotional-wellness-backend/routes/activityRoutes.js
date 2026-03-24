const express = require('express');
const router = express.Router();
const {
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  deleteActivity
} = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .post(createActivity)
  .get(getActivities);

router.route('/:id')
  .get(getActivityById)
  .put(updateActivity)
  .delete(deleteActivity);

module.exports = router;
