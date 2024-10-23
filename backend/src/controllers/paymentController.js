// src/controllers/paymentController.js
/**
 * This module handles the payment processing functionality.
 * @module paymentController
 */

/**
 * Process payment for a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.body.userId - The ID of the user making the payment.
 * @param {number} req.body.amount - The amount to be paid.
 * @param {string} req.body.dermatologistId - The ID of the dermatologist receiving the payment.
 * @returns {Object} The response object with the payment result and commission result.
 * @throws {Error} If an error occurs during payment processing.
 * @example
 * // Example request body
 * {
 *   "userId": "XXXXXXX",
 *   "amount": 100,
 *   "dermatologistId": "XXXXXXX"
 * }
 * @example
 * // Example response
 * {
 *   "message": "Payment processed",
 *   "paymentResult": {
 *     "status": "success",
 *     "transactionId": "XXXXXX"
 *   },
 *   "commissionResult": {
 *     "status": "success",
 *     "commissionAmount": 30,
 *     "commissionTransactionId": "XXXXXXXXXXXXX"
 *   }
 * }
 * @example
 * // Example error response
 * {
 *   "message": "Payment processing failed",
 *   "error": "An error occurred during payment processing"
 * }
 * @see PaymentService.initiatePayment
 * @see PaymentService.splitPayment
 */

const paystack = require('../config/paystack');
const Subscription = require('../models/subscriptionModel');
const Payment = require('../models/paymentModel');

// Process Payment (for subscriptions or reviews)
exports.processPayment = async (req, res) => {
  // Payment processing logic...
  const { userId, amount, email } = req.body;
  try {
    // Initialize payment using Paystack
    const paymentResponse = await paystack.initializeTransaction({
        amount: amount * 100,  // Paystack requires amount (i.e., cents)
        email: email,
        callback_url: `${process.env.FRONTEND_URL}/payment/callback`,  // Redirect URL after payment
        });

        if (paymentResponse.status) {
            // Save payment info in the database
            await Payment.create({
            user_id: userId,
            amount: amount,
            payment_status: 'pending',
            reference: paymentResponse.data.reference,
        });
        // Return the payment URL to redirect user
        return res.status(200).json({ message: 'Payment initiated', payment_url: paymentResponse.data.authorization_url });
        } else {
            return res.status(400).json({ message: 'Payment initiation failed' });
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ message: 'Payment failed', error });
    }
};

// Verify Payment and Handle Commission Distribution
exports.verifyPayment = async (req, res) => {
    const { reference } = req.query;

    try {
        // Verify the transaction with Paystack
        const paymentVerification = await paystack.verifyTransaction({ reference });

        if (paymentVerification.status) {
            const { data } = paymentVerification;

            // Mark payment as successful in the database
            const payment = await Payment.findOne({ where: { reference } });
            payment.payment_status = 'successful';

            // Calculate commission (70% dermatologist, 30% AFRIGEM)
            const dermatologistShare = (payment.amount * 0.7).toFixed(2);
            const afrigemShare = (payment.amount * 0.3).toFixed(2);

            payment.dermatologist_share = dermatologistShare;
            payment.afrigem_share = afrigemShare;
            await payment.save();
  
        // Update the subscription (if applicable)
        await Subscription.update(
            { is_active: true, start_date: new Date() },
            { where: { user_id: payment.user_id } }
        );
            res.status(200).json({ message: 'Payment successful', payment });
        } else {
            res.status(400).json({ message: 'Payment verification failed' });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({ message: 'Payment verification failed', error });
    }
};