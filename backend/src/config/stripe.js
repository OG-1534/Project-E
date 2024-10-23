//src/config/stripe.js
/**
 * This module handles payment processing using the Stripe API.
 * It imports the 'stripe' package and initializes it with the provided Stripe secret key from the environment variables.
 * The initialized 'stripe' object can be used to interact with the Stripe API for payment processing.
 * @module config/stripe
 * @requires stripe
 * @requires dotenv
 */

require('dotenv').config(); // Load environment variables from .env file

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;