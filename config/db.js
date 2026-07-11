const mongoose = require("mongoose");
const mongo_url = "mongodb://127.0.0.1:27017/firstproduct";

async function connectDB() {
    try{
     await mongoose.connect(mongo_url);
     console.log( "connected to db");
    }catch(err){
        console.error("database connection failed" , err);
        process.exit(1);
    }
};

module.exports = connectDB;
