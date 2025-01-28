const express = require('express');
const { sendOTPToTelegram } = require('./telegramAPI');

const app = express();
app.use(express.json());

app.post('/api/send-otp', async (req, res) => {
    const { username, otp } = req.body;

    if (!username || !otp) {
        return res.status(400).json({ error: 'Username and OTP are required.' });
    }

    try {
        await sendOTPToTelegram(username, otp);
        res.status(200).json({ message: 'OTP sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
