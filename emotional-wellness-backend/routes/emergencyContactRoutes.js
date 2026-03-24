const express = require('express');
const router = express.Router();
const {
  createEmergencyContact,
  getEmergencyContacts,
  getEmergencyContactById,
  updateEmergencyContact,
  deleteEmergencyContact
} = require('../controllers/emergencyContactController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .post(createEmergencyContact)
  .get(getEmergencyContacts);

router.route('/:id')
  .get(getEmergencyContactById)
  .put(updateEmergencyContact)
  .delete(deleteEmergencyContact);

module.exports = router;
