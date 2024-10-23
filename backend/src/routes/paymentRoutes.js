//src/routes/paymentRoutes.js
/**
 * This module defines the routes for payment-related operations.
 * It imports the necessary controllers and sets up the routes using Express.
 * 
 * @module paymentRoutes
 * @requires express
 * @requires ../controllers/paymentController
 * @requires ../middlewares/authMiddleware
 * @see {@link XXXXXXXXXXXXXXXXXXXXXX Express.js}
 * @see {@link module:../controllers/paymentController}
 * @see {@link module:../middlewares/authMiddleware}
 * 
 * @example
 * // Example usage of the paymentRoutes module
 * const express = require('express');
 * const paymentRoutes = require('./routes/paymentRoutes');
 * const app = express();
 * 
 * app.use('/api/payments', paymentRoutes);
 * 
 * app.listen(3000, () => {
 *   console.log('Server is running on port 3000');
 * });
 */

const express = require('express');
const { processPayment, verifyPayment } = require('../controllers/paymentController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment processing and verification
 */
/**
 * @swagger
 * /api/payments/initialize:
 *   post:
 *     summary: Initialize payment for a subscription
 *     description: Initializes a payment using Paystack for a subscription.
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID of the user
 *               package_type:
 *                 type: string
 *                 description: Type of subscription package
 *               email:
 *                 type: string
 *                 description: User's email address
 *               amount:
 *                 type: number
 *                 description: Subscription amount in USD
 *             example:
 *               userId: 1
 *               package_type: "premium"
 *               email: "user@example.com"
 *               amount: 3.99
 *     responses:
 *       200:
 *         description: Payment link created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment initiated"
 *                 payment_url:
 *                   type: string
 *                   example: "https://paystack.com/redirect"
 *                 subscription:
 *                   type: object
 *       500:
 *         description: Server error
 */

router.post('/payments/initialize', processPayment);

/**
 * @swagger
 * /api/payments/verify:
 *   get:
 *     summary: Verify a payment
 *     description: Verifies the payment transaction with Paystack and activates the subscription.
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: reference
 *         schema:
 *           type: string
 *         required: true
 *         description: Paystack payment reference
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment verified"
 *                 subscription:
 *                   type: object
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Server error
 */

router.get('/payments/verify', verifyPayment);

module.exports = router;