const { kMaxLength } = require('buffer');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 4,
        kMaxLength : 50
    },
    lastName : {
        type : String,
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : true,
    },
    age : {
        type : Number,
    },
    gender : {
        type : String,
        validator(value){
            if(!['male','female','others'].includes(value)){
                throw new Error('Gender data is not valid')
            }
        }
    },
    photoUrl : {
        type : String,
        default : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRALuBZK6mHA5oHxGpBUdj2J3bn6LCb_s2Ffw&s'
    },
    about : {
        type : String,
        default : 'This is default about',
    },
    skills : {
        type : [String]
    }
},
{
    timestamps : true
}
)

// const User = mongoose.model('User',userSchema);

// module.exports = User;

module.exports = mongoose.model('User',userSchema);