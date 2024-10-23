//src/controllers/subscriptionController.js
/**
 * This module defines the subscription controller logic
 * 
 */

const Payment = require('../models/paymentModel');
const Subscription = require('../models/subscriptionModel');
const User = require('../models/userModel');
const paystack = require('../config/paystack');
const SUBSCRIPTION_PRICING = require('../config/subscriptionPricing');

// Get subscription details for a user
exports.getSubscription = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const subscription = await Subscription.findOne({ where: { user_id: userId, is_active: true } });
      if (!subscription) {
        return res.status(404).json({ message: 'No active subscription found' });
      }
  
      return res.status(200).json({ subscription });
    } catch (error) {
      console.error('Error getting subscription:', error);
      return res.status(500).json({ message: 'Failed to get subscription', error });
    }
};

exports.createSubscription = async (req, res) => {
  const { userId, package_type, email } = req.body;

  try {
    // 1. Get user details
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Check if the package_type exists in the pricing structure
    const amount = SUBSCRIPTION_PRICING[package_type.toLowerCase()];
    if (amount === undefined) {
      return res.status(400).json({ message: `Invalid subscription package: ${package_type}` });
    }

    console.log(`Package type: ${package_type}, Amount: ${amount}`);

    // 3. Initialize Paystack payment for subscription
    const paymentResponse = await paystack.initializeTransaction({
      amount: amount * 100, // Convert to cents (Paystack’s smallest unit for USD)
      email: email,
      currency: 'USD', // Ensure currency is set to USD
      callback_url: `${process.env.FRONTEND_URL}/payment/callback`,
    });

    if (!paymentResponse.status) {
      return res.status(400).json({ message: 'Failed to initiate payment' });
    }

    // 4. Save subscription details in the database with pending status
    const newSubscription = await Subscription.create({
      user_id: userId,
      package_type: package_type,
      start_date: new Date(),
      is_active: false,
      end_date: null,
    });

    // 5. Return the payment link for the user to complete the transaction
    return res.status(200).json({
      message: 'Subscription initiated',
      payment_url: paymentResponse.data.authorization_url,
      subscription: newSubscription
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return res.status(500).json({ message: 'Failed to create subscription', error });
  }
};


// Verify subscription payment and activate subscription
exports.verifySubscriptionPayment = async (req, res) => {
    const { reference } = req.query;
  
    try {
      // 1. Verify the payment with Paystack
      const paymentVerification = await paystack.verifyTransaction({ reference });
  
      if (!paymentVerification.status) {
        return res.status(400).json({ message: 'Payment verification failed' });
      }
  
      const { user_id } = paymentVerification.data.metadata;
  
      // 2. Update subscription details in the database
      const subscription = await Subscription.findOne({
        where: { user_id, is_active: false }
      });
  
      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
  
      // 3. Activate the subscription and set expiration date based on package_type
      subscription.is_active = true;
      const now = new Date();
      subscription.start_date = now;
  
      // Set end date based on the package type (monthly or yearly)
      if (subscription.package_type === 'premium') {
        subscription.end_date = new Date(now.setMonth(now.getMonth() + 1));  // 1 month for premium
      } else if (subscription.package_type === 'ai_analysis') {
        subscription.end_date = new Date(now.setFullYear(now.getFullYear() + 1));  // 1 year for AI Analysis
      }
  
      await subscription.save();
  
      return res.status(200).json({ message: 'Subscription activated', subscription });
    } catch (error) {
      console.error('Payment verification error:', error);
      res.status(500).json({ message: 'Payment verification failed', error });
    }
  };

// Automatically cancel subscription after expiration
exports.cancelSubscriptionOnExpiration = async () => {
    try {
      // Find expired subscriptions
      const subscriptions = await Subscription.findAll({
        where: {
          is_active: true,
          end_date: { [Op.lte]: new Date() },  // Expired subscriptions
        },
      });
  
      // Mark expired subscriptions as inactive
      for (const subscription of subscriptions) {
        subscription.is_active = false;
        await subscription.save();
      }
  
      console.log('Expired subscriptions deactivated');
    } catch (error) {
      console.error('Error deactivating expired subscriptions:', error);
    }
  };