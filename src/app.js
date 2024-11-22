const express = require('express')

const app = express()
const connectDB = require('./config/database')
const User = require('./models/user');

app.use(express.json())

//signup
app.post('/signup',async(req,res)=>{

    // const userObj = {
    //     firstName : 'Sushil',
    //     lastName : 'Suman',
    //     emailId : 'sushi12@gmail.com',
    //     password : 'Suman@123'
    // }

    // const user = new User(userObj);

    // const user = new User({
    //     firstName : 'Nibha',
    //     lastName : 'Yadav',
    //     emailId : 'nibha123@gmail.com',
    //     password : 'Nibha@123'
    // })

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

app.patch('/updateUser',async(req,res)=>{
    try{

        const userId = req.body.userId;
        const emailId = req.body.emailId;
        const data = req.body;

        const user = await User.findByIdAndUpdate({_id : userId},data)
        const userByEmail = await User.findOneAndUpdate({emailId : emailId},data)

        res.send('User is updated successfully')
    }
    catch(err){
        res.status(500).send('Something went wrong')
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















// const {adminAuth,userAuth} = require('./middleware/auth');

// app.use('/admin',adminAuth);
// // app.use('/user',userAuth)

// app.get('/admin/getAllData',(req,res)=>{
//     res.send('send all data')
// })

// app.post('/user/login',(req,res)=>{
//     res.send('User is logged In successfully')
// })

// app.get('/user/getUserData',userAuth,(req,res)=>{
//     res.send('User data is fetched successfully')
// })

// app.get('/admin/delete',(req,res)=>{
//     res.send('delete all data')
// })

// app.get('/getUserData',(req,res)=>{

//     try{
//         throw new Error('jrvr')
//         res.send('Data is send')
//     }
//     catch(err){
//         res.status(500).send('Something went wrong')
//     }

    
// })

// app.use('/',(err,req,res,next)=>{
//     if(err){
//         res.status(500).send('Something went wrong')
//     }
// })

// app.use('/',(req,res,next)=>{
//     console.log('Namaste node')
//     next()
//     // res.send('Namaste Node 1')
// },

// (req,res,next)=>{
//     console.log('Namaste node 2');
//     // res.send('Node 2')
//     next()
// }


// )

// app.use('/test',(req,res)=>{
//     console.log('Hello World!')
// })