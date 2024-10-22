//src/routes/passwordResetRoutes.js
/**
 * This module defines the routes for password reset functionality.
 * It imports the necessary controllers and sets up the routes using Express.
 * 
 * @module passwordResetRoutes
 * @requires express
 * @requires ../controllers/passwordController
 * @requires ../middlewares/authMiddleware
 * @requires ../utils/emailUtils
 * @requires ../utils/tokenUtils
 * @requires ../validators/passwordValidator
 * @requires ../validators/userValidator
 * @requires ../validators/validationResult
 * @requires ../validators/verifyToken
 * @requires ../validators/verifyUser
 * @requires ../validators/verifyUserByToken
 * @requires ../validators/verifyUserByTokenAndResetPassword
 * @requires ../validators/verifyUserByTokenAndResetPasswordValidator
 * @requires ../validators/verifyUserByTokenValidator
 * @requires ../validators/verifyUserValidator
 * @requires ../validators/verifyUserWithToken
 * @requires ../validators/verifyUserWithTokenValidator
 * @requires ../validators/verifyUserWithTokenAndResetPassword
 * @requires ../validators/verifyUserWithTokenAndResetPasswordValidator
 * @requires ../validators/verifyUserWithTokenAndResetPasswordValidator
 * @requires ../validators/verifyUserWithTokenAndResetPasswordValidator
 */

const express = require('express');
const { requestPasswordReset, resetPassword } = require('../controllers/passwordController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Password Reset
 *   description: Password Reset API
 */

// Request password reset (send email with token)
/**
 * @swagger
 * /api/password/request-password-reset:
 *   post:
 *     summary: Request a password reset link
 *     description: Sends an email with a password reset link to the user, which contains a reset token.
 *     tags: [Password Reset]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user requesting a password reset.
 *             example:
 *               email: "user@example.com"
 *     responses:
 *       200:
 *         description: Password reset email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset email sent"
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/request-password-reset', requestPasswordReset);

// Reset password (using token)
/**
 * @swagger
 * /api/password/reset-password:
 *   post:
 *     summary: Reset the user's password
 *     description: Allows the user to reset their password using the reset token sent via email.
 *     tags: [Password Reset]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The password reset token received in the email.
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user.
 *             example:
 *               token: "reset-token-received-in-email"
 *               newPassword: "newPassword123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset successfully"
 *       400:
 *         description: Invalid token or user not found
 *       500:
 *         description: Server error
 */
router.post('/reset-password', resetPassword);

module.exports = router;