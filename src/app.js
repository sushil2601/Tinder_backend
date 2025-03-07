const express = require('express')
const app = express()

require("dotenv").config();

const connectDB = require('./config/database')
const coockiParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/requests');
const userRouter = require('./routes/user');
const paymentRouter = require('./routes/payment');
const cors = require('cors')
const http = require('http');
const initializeSocket = require('./utils/socket');
const chatRouter = require('./routes/chat');

app.use(
    cors(
        {
            origin : "http://localhost:5173",
            credentials : true,
        }
));
app.use(express.json())
app.use(coockiParser());

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter)
app.use('/',paymentRouter);
app.use('/',chatRouter);

const server = http.createServer(app)
initializeSocket(server);1


connectDB()
.then(()=>{
    console.log('Databse connection established successfully...')

    //replacing the app to server to establish the socket connection
    server.listen(3000,()=>{
        console.log('App is running on the port 3000...')
    })
})
.catch((err)=>{
    console.error('Database cannot be connected')
})




/*
app.use('/',(req,res)=>{
    
    console.log('Hello World')

    })

    app.use('/hello',(req,res)=>{
        
        console.log('wjefjrw')
        
        })

    app.use('/test',(req,res)=>{
        
        console.log('wjhfvdv')
        
        })

    app.use('/hello/2',(req,res)=>{
        
        console.log('srg')
        
        })

    app.use('/hello123',(req,res)=>{
        
        console.log('wjgh')

        })

*/










