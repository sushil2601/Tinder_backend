const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async(req,res,next)=>{

    try{
        const token = req.cookies.token;

        //const {token} = req.cookies;

        console.log('Token :-',token)

        if(!token){
            // throw new Error('Token is not valid!!!!')
            return res.status(401).send('Please Login!!! ')
        }

        const decodedData = await jwt.verify(token,'Nibha@Tinder')

        const {_id} = decodedData;

        const user = await User.findById(_id);

        if(!user){
            throw new Error('User does not exit')
        }

        req.user = user;
        console.log('user', req.user)

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