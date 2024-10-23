const Paystack = require('paystack-node');

require('dotenv').config();  // Ensure environment variables are loaded

// Initialize Paystack with your secret key
const paystack = new Paystack(process.env.PAYSTACK_API_KEY);

// Exporting functions to initialize and verify payments
module.exports = {
  // Initialize a transaction
  initializeTransaction: async (data) => {
    try {
      const response = await paystack.initializeTransaction({
        email: data.email,
        amount: data.amount,  // Make sure this is in kobo (amount * 100)
        callback_url: data.callback_url
      });

      return response.body;  // Return the actual Paystack response
    } catch (error) {
      console.error('Paystack initialization error:', error);  // Log any errors
      return { status: false, message: 'Failed to initialize payment' };
    }
  },

  // Verify a transaction
  verifyTransaction: async (reference) => {
    try {
      const response = await paystack.verifyTransaction(reference);

      return response.body;  // Return the actual Paystack response
    } catch (error) {
      console.error('Paystack verification error:', error);  // Log any errors
      return { status: false, message: 'Failed to verify payment' };
    }
  }
};