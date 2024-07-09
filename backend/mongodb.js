// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// const result = dotenv.config();
// if (result.error) {
//     console.error('Error loading .env file:', result.error);
// }


// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI)
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// connectDB();

// module.exports={};


const {connect} = require("mongoose");

const MongoUrl = "mongodb+srv://rgs786999:8wm6lhVoV59yirSJ@cluster0.9olfp7w.mongodb.net";

const DB_NAME= `asra`

const connectDb= async ()=>{
    try{
        await connect(`${MongoUrl}/${DB_NAME}`);
        console.log("MongoDb Connected successfully!!");
    } catch(err){
        console.error(err);
    }
};

connectDb();

module.exports = {};
