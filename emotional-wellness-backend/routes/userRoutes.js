const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserProfile,
  getUserById,
  updateUserProfile,
  updateUser,
  deleteUser
} = require('../controllers/usercontroller');
const { protect, authorize } = require('../middelware/authmiddelware');

// All routes are protected
router.use(protect);

// Current user routes
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

// Admin only routes
router.use(authorize('admin'));

router.route('/')
  .get(getAllUsers);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
