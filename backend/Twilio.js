// Load environment variables (optional, but recommended for security)
require('dotenv').config();

// Import Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'AC49cf79ca2bad9ef4828ed8c2b228c3db';
const authToken = process.env.TWILIO_AUTH_TOKEN || '[authToken]';  // Replace with your actual authToken
const client = require('twilio')(accountSid, authToken);

// Send a WhatsApp message
client.messages
    .create({
        body: 'Your appointment is coming up with Rahul soon would you like to call him instaed of meeting him in person?',
        from: 'whatsapp:+14155238886',  // Twilio's sandbox WhatsApp number
        to: 'whatsapp:+919878781486'  // Replace with your actual WhatsApp number
    })
    .then(message => console.log(`Message sent: ${message.sid}`))
    .catch(err => console.error(`Error occurred: ${err.message}`));
