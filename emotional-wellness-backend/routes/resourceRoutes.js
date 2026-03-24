const express = require('express');
const router = express.Router();
const {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource
} = require('../controllers/resourceController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

// Publicly readable routes
router.get('/', getResources);
router.get('/:id', getResourceById);

// Admin-only write routes
router.use(authorize('admin'));

router.post('/', createResource);
router.put('/:id', updateResource);
router.delete('/:id', deleteResource);

module.exports = router;
