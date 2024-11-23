const express = require('express')

const app = express()
const { after } = require('node:test');
const { error } = require('console');
const bcrypt  = require('bcrypt');

const connectDB = require('./config/database')
const User = require('./models/user');
const {validateSignUpData} = require('./utils/validation');


app.use(express.json())

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

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(isPasswordValid){
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

//get a user by emailId
app.get('/user',async(req,res)=>{
    try{
        const userEmail = req.body.emailId;
        const userId = req.body.userId;

        // const user = await User.findById({_id : userId})
        const user = await User.findOne({emailId : userEmail});

        if(!user){
            res.status(404).send(
                'User is not found'
            )
        }
        else{
            res.send(user)
        }
    }catch(err){
        res.status(500).send('Something went wrong')
    }

})

//feed API  --> get all user
app.get('/feed',async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users)
    }catch(err){
        res.status(500).send('Something went wrong')
    }
})

//delete user

app.delete('/deleteUser',async(req,res)=>{
    try{
        const userId = req.body.userId;

        const deletedUser = await User.findByIdAndDelete({_id : userId})
        // const deletedUser = await User.findByIdAndDelete(userId);

        res.send('User is deleted successfully')
    }
    catch(err){
        res.status(500).send('Something went wrong')
    }
})

//update user

app.patch('/updateUser/:userId',async(req,res)=>{
    try{

        const userId = req.params?.userId;
        const emailId = req.body.emailId;
        const data = req.body;

        const ALLOWED_UPDATE = ["photo_url","about","gender","skills","age"]

        const isAllowedUpdate = Object.keys(data).every((k)=>ALLOWED_UPDATE.includes(k))

        if(!isAllowedUpdate){
            throw new Error('Update not allowed')
        }

        if(data?.skills.length > 10){
            throw new Error('Skills cannot be more than 10')
        }

        const user = await User.findByIdAndUpdate({_id : userId},data)
        const userByEmail = await User.findOneAndUpdate(
            {emailId : emailId},
            data,
            {returnDocument : after},
            {runValidator : true},

        )

        res.send('User is updated successfully')
    }
    catch(err){
        res.status(500).send('Update failed : '+ err.message)
    }
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















