const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../controllers/checkoutController');
const { handleWebhook } = require('../controllers/webhookController');
const { protect } = require('../middleware/authMiddleware');

// Checkout session (protected)
router.post('/create-checkout-session', protect, createCheckoutSession);

// Webhook (unprotected, uses raw body)
// Note: Handled specifically in server.js for raw body
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

module.exports = router;
