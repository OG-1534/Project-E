const Queue = require('bull');
const paymentQueue = new Queue('payment-processing');

paymentQueue.process(async (job, done) => {
  const { payment } = job.data;

  // Process the payment
  await processPaymentLogic(payment);

  done();
});

module.exports = paymentQueue;