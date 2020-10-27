const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index")

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };
  
  const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
  
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });
    return res.redirect(`/${user.role}/dashboard`);
  };
  

exports.register = async(req,res)=>{
    if (req.body.code === 'smskadmin') {
        req.body.role = 'admin';
        await db.Employee.create(req.body)
        // .catch(err => {
        //   if (err.code === 11000) {
        //     console.log(err);
        //     req.flash(
        //       'error',
        //       `Duplicate value at ${err.keyValue[Object.keys(err.keyValue)[0]]}`
        //     );
            const { email, phone, gender, name } = req.body;
            return res.render('registers', {
              email,
              phone,
              gender,
              name
            });
          }
    //       req.flash('error', 'Something Went Wrong');
    //       return res.redirect('back');
    //     });
    //     req.flash('success', `Created Succesfully Please login`);
    //     return res.redirect('back');
    //   }
      
  
      if (req.body.code === 'smskemployee') {
        req.body.role = 'employee';
        await db.Employee.create(req.body)
        // .catch(err => {
        //   if (err.code === 11000) {
        //     console.log(err);
            const { email, employeeId, phone, gender, name } = req.body;
            return res.render('registers', {
              email,
              employeeId,
              phone,
              gender,
              name
            });
          }
  
    //       req.flash('error', 'Something Went Wrong');
    //       return res.redirect('back');
    //     });
    //     req.flash('success', `Created Succesfully Please login`);
    //     return res.redirect('back');
    //   }
      else if (req.body.code === 'smskstudent') {
         req.body.role = 'student';
         req.body.password="samskruti"
        await db.User.create(req.body)
        //.catch(err => {
        //   if (err.code === 11000) {
        //     console.log(err);
            const { email, hallTicket, phone, gender, name } = req.body;
            // return res.render('registers', {
                return res.status(200).json({
              email,
              hallTicket,
              phone,
              gender,
              name
            });
          }
        
    //       req.flash('error', 'Something Went Wrong');
    //       return res.redirect('back');
    //     });
    //     req.flash('success', `Created Succesfully Please login`);
    //     return res.redirect('back');
    //   }
  else {
        req.flash('error', `Invalid Secret Code`);
        const { email, username, phone, gender, name } = req.body;
  
        return res.render('registers', {
          email,
          username,
          phone,
          gender,
          name
        });
      }
      
// try{
//     var {name,hallTicket,password,role,employeeId} = req.body
//     console.log(req.body)
// let user = await db.User.findOne({hallTicket:hallTicket})
// if(user){
//     if(user.role==="student"){
//         return res.status(400).json({
//             msg: "student with this hallticket Already Exists"
//         });
//     }else if(user.role ==="employee"){
//         return res.status(400).json({
//             msg: "employee with this employee id Already Exists"
//         });
//     }else{
//         return res.status(400).json({
//             msg: "admin Already Exists"
//         });
//     }
// }
// if(req.body.password == undefined){
//     password = "samskruti"
// }
//   if(req.body.hallTicket && !req.body.employeeId){
//     user = new db.User({
//    name,hallTicket,password,role
//     })
// }else if(!req.body.hallTicket && req.body.employeeId){
//     console.log("employee");
//     user = new db.User({
//         name,employeeId,password,role
// })
// }
//     console.log(password)
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//  console.log(user)
//     userid =  user._id.toString()
//    const token= jwt.sign(userid,process.env.JWTTOKEN)
//  user.token = token
//  await user.save()
//     return res.status(200).json(user)
// }catch(err){
// console.log(err.message);
// console.log("error in saving")
// }
}

exports.signin = async(req,res)=>{
try{
    console.log(req.body.hallTicket)
    console.log(req.body.employeeId)
    console.log(req.body.password)
if(req.body.hallTicket){
var user = await db.User.findOne({hallTicket:req.body.hallTicket})
}else if(req.body.employeeId){
    var user = await db.User.findOne({employeeId:req.body.employeeId})
}
console.log(user)
console.log("user")

if(!user){
    return res.redirect("/")
    // return res.status(200).json({message:"student does not exists"})
}
const isMatch = await bcrypt.compare(req.body.password,user.password)
console.log(isMatch)
if(!isMatch){
    return res.redirect("/")
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