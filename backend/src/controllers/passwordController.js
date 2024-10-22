//src/controllers/passwordController.js
/**
 * This module handles the password reset functionality for users.
 * It provides two endpoints:
 * 1. `requestPasswordReset`: Sends a password reset email to the user with a token that expires in 1 hour.
 * 2. `resetPassword`: Allows the user to reset their password using the token received in the email.
 *
 * The `requestPasswordReset` endpoint takes the user's email as input, finds the user in the database,
 * generates a JWT token with a short expiration time, and sends an email with the reset link containing the token.
 *
 * The `resetPassword` endpoint takes the token and new password as input, verifies the token, finds the user,
 * hashes the new password, and updates the user's password in the database.
 *
 * Both endpoints handle errors and return appropriate responses.
 *
 * @module passwordController
 * @requires ../models/userModel
 * @requires jwt
 * @requires bcryptjs
 * @requires ../utils/sendResetEmail
 * @requires dotenv
 */
require('dotenv').config();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const emailjs = require('emailjs-com');
const sendResetEmail = require('../utils/sendResetEmail');  // Utility function for sending emails

// Request password reset (send email with token)
exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    
    try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Create a reset token (valid for 1 hour)
        const resetToken = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        
        // Send reset email using EmailJS
        await sendResetEmail(user.email, resetLink);  // Here is where you send the reset email
        
        // Respond with success message
        res.status(200).json({ message: 'Password reset email sent' });
    
    } catch (error) {
        console.error(`Error in requestPasswordReset: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// Reset password (using token)
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by ID decoded from the token
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'Invalid token or user not found' });
    }
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update user's password and save
    user.password_hash = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};