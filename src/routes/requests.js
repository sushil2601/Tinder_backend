const express = require('express');
const requestRouter = express.Router();

const {userAuth} = require('../middleware/auth');
const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequest');

//sendConnection
requestRouter.post('/send/request/:status/:userId',userAuth,async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        const status = req.params.status;

        const allowedStatus = ['interested','ignored'];

        if(!allowedStatus){
            return new res.status(400).json({
                message : 'Invalid status type ' + status
            })
        }

        const toUser = await User.findById(toUserId);

        if(!toUser){
            return res.status(404).json({
                message : 'User not found'
            })
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or : [
                {fromUserId,toUserId},
                {fromUserId : toUserId,toUserId : fromUserId},
            ]
        })

        if(existingConnectionRequest){
            return res.status(400).json({
                message : 'Coonection Request Already Exits!!'
            })
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })

        const data = await connectionRequest.save();

        res.status(200).json({
            message : 'Connection Request Sent Successfully',
            data,
        })
    }
    catch(err){
        return res.status(400).json({
            message : err.message,
        })
    }

})

module.exports = requestRouter;