const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await User.findByIdAndUpdate(session.client_reference_id, {
        isPremium: true,
        subscriptionId: session.subscription,
        subscriptionStatus: 'active'
      });
      console.log(`Subscription activated for user ${session.client_reference_id}`);
      break;
    
    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      const user = await User.findOne({ subscriptionId: subscription.id });
      if (user) {
        user.isPremium = false;
        user.subscriptionStatus = 'canceled';
        await user.save();
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
