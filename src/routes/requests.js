const express = require('express');
const requestRouter = express.Router();

const {userAuth} = require('../middleware/auth');

//sendConnection
requestRouter.post('/sendConnectionRequest',userAuth,async(req,res)=>{
    
    const user = req.user;

    res.send(user.firstName  + ' has sent the request')

})

module.exports = requestRouter;