//src/routes/subscriptionRoutes.js
/**
 * This module defines routes for handling subscriptions
 */

const express = require('express');
const { createSubscription, verifySubscriptionPayment, getSubscription } = require('../controllers/subscriptionController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Manage user subscriptions
 */

/**
 * @swagger
 * /api/subscription/create-subscription:
 *   post:
 *     summary: Create a subscription and initiate payment
 *     description: This endpoint allows the user to create a subscription for a plan and initiate payment using Paystack.
 *     tags:
 *       - Subscriptions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               package_type:
 *                 type: string
 *                 enum: [basic, premium, ai_analysis]
 *                 description: The type of subscription package.
 *                 example: premium
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: "user@example.com"
 *               amount:
 *                 type: number
 *                 description: The amount for the subscription.
 *                 example: 3.99
 *     responses:
 *       200:
 *         description: Subscription initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Subscription initiated"
 *                 payment_url:
 *                   type: string
 *                   example: "https://paystack.com/pay/abc123"
 *                 subscription:
 *                   type: object
 *                   description: The created subscription details.
 *       400:
 *         description: Failed to initiate payment
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/create-subscription', createSubscription);

/**
 * @swagger
 * /api/subscription/verify-subscription-payment:
 *   get:
 *     summary: Verify payment and activate subscription
 *     description: This endpoint verifies the payment using Paystack and activates the user's subscription.
 *     tags:
 *       - Subscriptions
 *     parameters:
 *       - in: query
 *         name: reference
 *         schema:
 *           type: string
 *         required: true
 *         description: Paystack transaction reference.
 *     responses:
 *       200:
 *         description: Subscription activated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Subscription activated"
 *                 subscription:
 *                   type: object
 *                   description: The subscription details after activation.
 *       400:
 *         description: Payment verification failed
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Server error
 */
router.get('/verify-subscription-payment', verifySubscriptionPayment);

/**
 * @swagger
 * /api/subscription/{userId}:
 *   get:
 *     summary: Get active subscription for a user
 *     description: Retrieves the active subscription details for the specified user.
 *     tags:
 *       - Subscriptions
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: Subscription details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subscription:
 *                   type: object
 *       404:
 *         description: No active subscription found
 *       500:
 *         description: Server error
 */
router.get('/subscription/:userId', getSubscription);

module.exports = router;