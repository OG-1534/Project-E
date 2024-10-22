const axios = require('axios')
require('dotenv').config();  // Load environment variables

/**
 * Sends a password reset email using EmailJS via REST API.
 *
 * @param {string} email - The email address of the user.
 * @param {string} resetLink - The link to reset the user's password.
 */
const sendResetEmail = async (email, resetLink) => {
    const emailData = {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_USER_ID,
        template_params: {
          to_email: email,
          reset_link: resetLink,
        }
      };

      // Log the email data for debugging
      console.log('Sending email with the following data:', emailData);
      
      try {
        const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', emailData, {
            headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.status === 200) {
            console.log(`Password reset email sent to ${email}`);
        } else {

            console.error(`Failed to send email to ${email}: ${response.statusText}`);
            throw new Error('Could not send password reset email');
        }
    } catch (error) {
        
        console.error(`Failed to send email to ${email}:`, error.message);
        throw new Error('Could not send password reset email');
    }
};

module.exports = sendResetEmail;