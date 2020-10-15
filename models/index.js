const mongoose = require("mongoose");
mongoose.set("debug",true)
mongoose.Promise=Promise
require('dotenv').config();

mongoose.connect(
    `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@cluster0.aadkh.mongodb.net/samskrutidb`,{
        useNewUrlParser : true,
        useUnifiedTopology: true,
        useCreateIndex:true       
    }

).then(()=>{
    console.log("connection successfull")
})

exports.User = require('../models/userModel')