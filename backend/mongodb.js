const dotenv = require('dotenv');

const result = dotenv.config();

const {connect} = require("mongoose");

const MongoUrl =process.env.MONGO_URI;


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
