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

//get connection
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

//feed API
userRouter.get('/feed',userAuth,async(req,res)=>{
    try{

        const loggedIn = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (skip-1)*limit;


        const connectionRequest = await ConnectionRequest.find({
            $or : [
                {fromUserId : loggedIn._id},
                {toUserId : loggedIn._id},
            ]
    }).select('fromUserId toUserId')

        const hideUserFromFeed = new Set();
        connectionRequest.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        })

        const user = await User.find({
            $and : [
                {_id : {$nin : Array.from(hideUserFromFeed)}},
                {_id : {$ne : loggedIn._id}},
            ]
        })
        .select(USER_DATA)
        .skip(skip)
        .limit(limit);

        res.json({
            data : user,
        })
        
    }
    catch(err){
        res.status(400).json({
            ERROR : err.message,
        })
    }
})

module.exports = userRouter;