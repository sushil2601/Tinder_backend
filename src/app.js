const express = require('express')
const app = express()

const connectDB = require('./config/database')
const coockiParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/requests');


app.use(express.json())
app.use(coockiParser());

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);




connectDB()
.then(()=>{
    console.log('Databse connection established successfully...')
    app.listen(3000,()=>{
        console.log('App is running on the port 3000...')
    })
})
.catch((err)=>{
    console.error('Database cannot be connected')
})















