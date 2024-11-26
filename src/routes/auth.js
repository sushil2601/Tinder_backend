const express = require('express');

const authRouter = express.Router();

const { after } = require('node:test');
const { error } = require('console');
const bcrypt  = require('bcrypt');
const User = require('../models/user');
const {validateSignUpData} = require('../utils/validation');

//signup
authRouter.post('/signup',async(req,res)=>{
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

//login
authRouter.post('/login',async(req,res)=>{

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

//logout
authRouter.post('/logout',async(req,res)=>{

    res.cookie("token",null,
        {expires : new Date(Date.now)}
    ).send('Logout Successfully')
})

module.exports = authRouter;