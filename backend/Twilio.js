// Load environment variables (optional, but recommended for security)
require('dotenv').config();

// Import Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = require('twilio')(accountSid, authToken);

const msg="Your appointment is coming up with Rahul soon would you like to call him instaed of meeting him in person?"
client.messages
    .create({
        body: `${msg}`,
        from: '+14808787901',
        to: '+918427533412'
    })
    .then(message => console.log(message.sid));

    