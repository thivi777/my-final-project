const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

exports.createCheckoutSession = async (req, res) => {
  try {
    const { priceId } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId || process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/dashboard/profile?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard/premium`,
      client_reference_id: req.user._id.toString(),
      customer_email: req.user.email,
    });

    res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe Session Error:', error);
    res.status(500).json({
      success: false,
      message: 'Could not create checkout session',
    });
  }
};
