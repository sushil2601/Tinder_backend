const express = require('express')
const app = express()

const connectDB = require('./config/database')
const coockiParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/requests');
const userRouter = require('./routes/user');


app.use(express.json())
app.use(coockiParser());

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter)




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










