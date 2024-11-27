const { timeStamp } = require('console');
const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({

    fromUser : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },

    toUser : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },

    status : {
        type : String,
        enum : ['interested','ignored','accepted','rejected'],
        values : `{VALUE} is incoreect status type`
    },
},
{timeStamps: true}
);

connectionRequestSchema.index({fromUser : 1},{toUser : 1})

connectionRequestSchema.pre('save',function(next){
    const connectionRequest = this;

    if(connectionRequest.fromUser.equals(connectionRequest.toUser)){
        throw new Error('You cannot send request to youself')
    }

    next();
})


const ConnectionRequest = new mongoose.model('ConnectionRequest',connectionRequestSchema);

module.exports = ConnectionRequest;