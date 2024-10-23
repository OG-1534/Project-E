//src/config/cron.js
/**
 * This configuration module defines cron job tasks.
 
 */
const cron = require('node-cron');
const { cancelSubscriptionOnExpiration } = require('../controllers/subscriptionController');

// Run this job daily at midnight to check for expired subscriptions
cron.schedule('0 0 * * *', async () => {
  console.log('Running subscription expiration job...');
  await cancelSubscriptionOnExpiration();
});

module.exports = cron;