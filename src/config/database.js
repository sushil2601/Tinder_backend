const mongoose = require('mongoose');

require('dotenv').config()

const connectDB = async(req,res)=>{
    await mongoose.connect(
       process.env.DB_URL 
    )
}

module.exports = connectDB;

