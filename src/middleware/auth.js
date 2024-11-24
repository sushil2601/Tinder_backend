const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async(req,res,next)=>{

    try{
        const token = req.cookies;

        if(!token){
            throw new Error('Token is not valid!!!!')
        }

        const decodedData = await jwt.verify(token,'Nibha@Tinder')

        const {_id} = decodedData;

        const user = await User.findById(_id);

        if(!user){
            throw new Error('User does not exit')
        }

        req.user = user;

        next();
    }
    catch(err){
        res.status(400).send('ERROR : ' + err.message);
    }

}

module.exports = {
    // adminAuth,
    userAuth
}