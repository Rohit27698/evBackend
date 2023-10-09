require("dotenv").config()
const jwt = require('jsonwebtoken');



const Authenticate =(req ,res ,next)=>{
 const token =req.headers.authorization?.split(" ")[1]
 jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
    if(err){
        res.send("Please Login First")
    }else{
        req.userID=decoded.userID
        next();
    }
  });

}



module.exports = {Authenticate}