// const Razorpay = require('razorpay');

// require('dotenv').config();

// const instance = new Razorpay({
//     key_id : process.env.RAZOR_KEY_ID,
//     key_secret : process.env.RAZOR_SECRET_ID
// })

// module.exports = instance;
require('dotenv').config();

const Razorpay = require("razorpay");


// console.log("RAZOR_KEY_ID:", process.env.RAZOR_KEY_ID);
// console.log("RAZOR_SECRET_ID:", process.env.RAZOR_SECRET_ID);
// console.log('JWT secret :- ',process.env.JWT_SECRET)

var razorpayInstance = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_SECRET_ID,
});

module.exports = razorpayInstance;