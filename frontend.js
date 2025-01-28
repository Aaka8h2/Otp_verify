document.addEventListener('DOMContentLoaded', () => {
    let generatedOTP = '';
    let timerInterval;

    function generateOTP() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    async function sendOTP() {
        const telegramId = document.getElementById('telegram-id').value;
        const errorElement = document.getElementById('telegram-error');

        if (!telegramId || !telegramId.startsWith('@')) {
            errorElement.textContent = 'Please enter a valid Telegram username starting with @';
            return;
        }

        generatedOTP = generateOTP();

        try {
            // Call the backend API to send the OTP via the Telegram bot
            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: telegramId,
                    otp: generatedOTP,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                console.log('OTP sent:', result.message);
                document.getElementById('telegram-id-section').classList.add('hidden');
                document.getElementById('otp-section').classList.remove('hidden');
                startTimer(120);
            } else {
                errorElement.textContent = result.error || 'Failed to send OTP. Please try again.';
            }
        } catch (error) {
            errorElement.textContent = 'Failed to send OTP. Please check the username and try again.';
            console.error('Error:', error);
        }
    }

    function startTimer(duration) {
        let timer = duration;
        const timerElement = document.getElementById('timer');

        timerInterval = setInterval(() => {
            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;

            timerElement.textContent = `Resend OTP in ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (--timer < 0) {
                clearInterval(timerInterval);
                timerElement.innerHTML = '<a href="#" onclick="resendOTP()">Resend OTP</a>';
            }
        }, 1000);
    }

    async function verifyOTP() {
        const enteredOTP = Array.from(document.getElementsByClassName('otp-input'))
            .map((input) => input.value)
            .join('');

        const errorElement = document.getElementById('otp-error');
        const successElement = document.getElementById('otp-success');

        if (enteredOTP === generatedOTP) {
            errorElement.textContent = '';
            successElement.textContent = 'OTP Verified Successfully! Redirecting...';

            // Redirect to dashboard or next page
            setTimeout(() => window.location.href = '/dashboard', 2000);
        } else {
            successElement.textContent = '';
            errorElement.textContent = 'Invalid OTP. Please try again.';
        }
    }

    window.sendOTP = sendOTP;
    window.verifyOTP = verifyOTP;
});
