const axios = require('axios');

const BOT_TOKEN = '7158237482:AAEL0v_4VXVJBxhLaOqUhZXwNrpUKRc-wPI';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

/**
 * Sends an OTP to the user's Telegram.
 * @param {string} username - The Telegram username (e.g., @username).
 * @param {string} otp - The OTP to send.
 * @returns {Promise<void>} - Resolves if the message is sent successfully.
 */
async function sendOTPToTelegram(username, otp) {
    try {
        const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
            chat_id: username,
            text: `Your OTP is: ${otp}`,
        });
        console.log('OTP sent successfully:', response.data);
    } catch (error) {
        console.error('Failed to send OTP:', error.response?.data || error.message);
        throw new Error('Failed to send OTP. Please check the username and try again.');
    }
}

module.exports = { sendOTPToTelegram };
