const mongoose=require('mongoose');
require("dotenv").config()

const connect=mongoose.connect(`${process.env.MONGOOSE_URL}/evaluation`);

module.exports={connect}