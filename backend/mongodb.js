const mongoose = require('mongoose');
const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
    console.error('Error loading .env file:', result.error);
}


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB;
/*schema will be updated in this file */
