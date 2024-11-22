const express = require('express')

const app = express()
const connectDB = require('./config/database')
const User = require('./models/user');
const { after } = require('node:test');
const { error } = require('console');

app.use(express.json())

//signup
app.post('/signup',async(req,res)=>{

    const user = new User(req.body)

    try{
        await user.save();
        res.send('User details is added successfully')
    }
    catch(err){
        res.status(500).send('Error while fetching the user details')
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















