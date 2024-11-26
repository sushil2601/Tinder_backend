const express = require('express');
const profileRouter = express.Router();

const {userAuth} = require('../middleware/auth');

//profile
profileRouter.get('/profile/view',userAuth,async(req,res)=>{

    try{

        const user = req.user;

        res.send(user);

    }
    catch(err){
        res.status(500).send('ERROR : ' + err.message);
    }
})

//update_profile
profileRouter.put('/profile/edit',userAuth,async(req,res)=>{
    try{
        if(!validateEditProfile(req)){
            throw new Error('Unable to edit the profile')

            // return res.send('Unable to edit the profile')
        }

        const loggedIn = req.user;

        Object.keys(req.body).forEach((key)=>loggedIn[key] = req.body[key]);

        loggedIn.save();

        res.status(200).json({
            message : 'Your profile is updated successfully',
            data : loggedIn,
        })

    }
    catch(err){
        res.status(500).json({
            message : err.message,
        })
    }
})

//forgot password
profileRouter.post('/profile/password',async(req,res)=>{
    try{

    }
    catch(err){
        res.status(500).json({
            message : err.message,
        })
    }
})

module.exports = profileRouter;