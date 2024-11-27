const express = require('express');
const { userAuth } = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');

const userRouter = express.Router();

const USER_DATA = "firstName lastName";
//get all pending request

userRouter.get('/user/requests/received',userAuth,async(req,res)=>{

    try{

        const loggedIn = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId : loggedIn._id,
            status : 'interested',
        }).populate('fromUserId',['firstName','lastName'])     //        }).populate('fromUserId','firstName''lastName')

        res.json({
            message : 'Data fetched successfully',
            data : connectionRequest,
        })
    }
    catch(err){
        return res.status(400).send('ERROR : ' + err.message)
    }
})

userRouter.get('/user/connection',userAuth,async(req,res)=>{
    try{

        const loggedIn = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or : [
                {fromUserId : loggedIn._id,status : 'accepted'},
                {toUserId : loggedIn._id, status : 'accepted'}
            ]
        }).populate('fromUserId',USER_DATA)
        .populate('toUserId',USER_DATA);
        

        const data = connectionRequest.map((row) =>{
            if(row.fromUserId._id.toString() === loggedIn._id.toString()){
                return toUserId;
            }
            return fromUserId;
        });

        res.json({
            message : 'Fetched data successfully',
            data,
        })

    }
    catch(err){
        res.status(400).json({
            message : err.message,
        })
    }
})

module.exports = userRouter;