const mongoose = require("mongoose");

async function connectDB() {
    try{
     await mongoose.connect(process.env.MONGO_URL);
     console.log( "connected to db");
    }catch(err){
        console.error("database connection failed" , err);
        process.exit(1);
    }
};

module.exports = connectDB;
