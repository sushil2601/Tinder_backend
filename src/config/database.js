const mongoose = require('mongoose');

require('dotenv').config()

const connectDB = async(req,res)=>{
    await mongoose.connect(
       process.env.URL 
    )
}

module.exports = connectDB;

