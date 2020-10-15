const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index")



exports.register = async(req,res)=>{
try{
    var {name,hallTicket,password,role} = req.body
    console.log(req.body)
let user = await db.User.findOne({hallTicket:hallTicket})
if(user){
    if(user.role==="student"){
        return res.status(400).json({
            msg: "student with this hallticket Already Exists"
        });
    }else if(user.role ==="employee"){
        return res.status(400).json({
            msg: "employee with this employee id Already Exists"
        });
    }else{
        return res.status(400).json({
            msg: "admin Already Exists"
        });
    }
}
if(req.body.password == undefined){
    password = "samskruti"
}
    user = new db.User({
   name,hallTicket,password,role
    })
    console.log(password)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
 console.log(user)
    userid =  user._id.toString()
   const token= jwt.sign(userid,process.env.JWTTOKEN)
 user.token = token
 await user.save()
    return res.status(200).json(user)
}catch(err){
console.log(err.message);
console.log("error in saving")
}
}

exports.signin = async(req,res)=>{
try{
    console.log(req.body.hallTicket)
    console.log(req.body.password)

const user = await db.User.findOne({hallTicket:req.body.hallTicket})
console.log("user")
console.log(user)
if(!user){
    return res.redirect("/welcome")
    // return res.status(200).json({message:"student does not exists"})
}
const isMatch = await bcrypt.compare(req.body.password,user.password)
console.log(isMatch)
if(!isMatch){
    return res.redirect("/welcome")
    // return res.status(200).json({message:"password does not match"})
}
const userId = user._id.toString()
const token= jwt.sign(userId,process.env.JWTTOKEN)
user.token = token
await user.save()
return res.render("student_dashboard.ejs",{user})
// return res.status(200).json(user)
}catch(err){
    console.log("signin failed")
    return res.redirect("/")
    // res.status(400).json(err)
}

}

exports.logout = async(req,res)=>{
return res.redirect("/")
}