const express=require('express');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../modal/User.model')
const bcrypt = require('bcryptjs');
require("dotenv").config()


const app = express();



app.use(express.json())


const UserRouter=express.Router()

UserRouter.post("/signup",  (req, res) => {
    const { name, password, email } = req.body;
    try {
        bcrypt.hash(password, 4, async function(err, hash) {
            await UserModel.create({ name, password:hash, email})
        res.status(200).send(`Thankyou for connecting with us ${name}`);
        });
    } catch (error) {
        res.status(404).send('something went Wrong')
        console.log((error))
    }
})



UserRouter.post("/login", async(req, res) => {
    const {email,password}=req.body;
    const user = await UserModel.findOne({email})
    if(!user){
        res.send("signup first")
    }
    const hash=user.password;
    

        bcrypt.compare(password, hash, function(err, result) {
            if(result){
                const token = jwt.sign({ userID: user._id }, process.env.JWT_KEY);
                res.status(200).send({masssege: `welcome ${user.name}` ,token:token})
            }else{
                res.status(501).send("user login faild")
            }
        });
})


module.exports={UserRouter}