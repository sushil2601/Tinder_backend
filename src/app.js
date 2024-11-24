const express = require('express')

const app = express()
const { after } = require('node:test');
const { error } = require('console');
const bcrypt  = require('bcrypt');
const coockiParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const connectDB = require('./config/database')
const User = require('./models/user');
const {validateSignUpData} = require('./utils/validation');
const {userAuth} = require('./middleware/auth');


app.use(express.json())
app.use(coockiParser());

//signup
app.post('/signup',async(req,res)=>{
    try{
        //validating data
        validateSignUpData(req);

        const{
            firstName,
            lastName,
            emailId,
            password
        }  = req.body;

        //encrypting password
        const hashedPassword = await bcrypt.hash(password,10)


        const user = new User({
            firstName,
            lastName,
            emailId,
            password : hashedPassword,
        })
   
        await user.save();
        res.send('User details is added successfully')
    }
    catch(err){
        res.status(500).send('ERROR : ' + err.message);
    }
})

app.post('/login',async(req,res)=>{

    try{
        const {emailId,password} = req.body;

        const user = await User.findOne({emailId : emailId});

        if(!user){
            throw new Error('User is not present');
        }

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){

            const token  = await user.getJWT();

            res.cookie("token", token,{expires : new Date(Date.now()+8*3600000)});

            res.send('Login Successfully !!!')
        }
        else{
            throw new Error('Invalid credentials')
        }
    }
    catch(err){
        res.status(500).send('ERROR : ' + err.message);
    }
})

app.get('/profile',userAuth,async(req,res)=>{

    try{

        const user = req.user;

        res.send(user);

    }
    catch(err){
        res.status(500).send('ERROR : ' + err.message);
    }
})

app.post('/sendConnectionRequest',userAuth,async(req,res)=>{
    
    const user = req.user;

    res.send(user.firstName  + ' has sent the request')

})

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















