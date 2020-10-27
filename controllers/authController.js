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
    //  return res.status(200).json("successfullylogged in")
     return res.redirect(`/${user.role}/dashboard`);
  };
  

exports.register = async(req,res)=>{
    if (req.body.code === 'smskadmin') {
        req.body.role = 'admin';
        req.body.password="samskruti"
        await db.Employee.create(req.body)
        // .catch(err => {
        //   if (err.code === 11000) {
        //     console.log(err);
        //     req.flash(
        //       'error',
        //       `Duplicate value at ${err.keyValue[Object.keys(err.keyValue)[0]]}`
        //     );
            const { email,Id, phone, gender, name } = req.body;
            return res.render('login', {
            // return res.status(200).json({
              email,
              Id,
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
        req.body.password="samskruti"
        await db.Employee.create(req.body)
        // .catch(err => {
        //   if (err.code === 11000) {
        //     console.log(err);
            const { email, Id, phone, gender, name } = req.body;
          //  return res.render('registers', {
            return res.status(200).json({
              email,
             Id,
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
  
}

exports.studentSignin = async(req,res)=>{
try{
    const { hallTicket, password } = req.body;
  if (!hallTicket || !password) {
    req.flash('error', 'Please provide username and password!');
    // return next(new AppError('Please provide username and password!', 400));
    return res.redirect('/');
  }
  const user = await db.User.findOne({ hallTicket: hallTicket }
  ).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    req.flash('error', 'Incorrect email or password');
    return res.redirect('/');
  }
//   if (user.onhold) {
//     req.flash('error', 'Account on Hold Please contact Administrator');
//     return res.redirect('/auth/signin');
//   }
  //   await user.save();
  createSendToken(user, 200, req, res);

//     console.log(req.body.hallTicket)
//     console.log(req.body.employeeId)
//     console.log(req.body.password)
// if(req.body.hallTicket){
// var user = await db.User.findOne({hallTicket:req.body.hallTicket})
// }else if(req.body.employeeId){
//     var user = await db.User.findOne({employeeId:req.body.employeeId})
// }
// console.log(user)
// console.log("user")

// if(!user){
//     return res.redirect("/")
//     // return res.status(200).json({message:"student does not exists"})
// }
// const isMatch = await bcrypt.compare(req.body.password,user.password)
// console.log(isMatch)
// if(!isMatch){
//     return res.redirect("/")
//     // return res.status(200).json({message:"password does not match"})
// }
// const userId = user._id.toString()
// const token= jwt.sign(userId,process.env.JWTTOKEN)
// user.token = token
// await user.save()
// return res.render("student_dashboard.ejs",{user})
// return res.status(200).json(user)
}catch(err){
    console.log("signin failed")
    return res.redirect("/")
    // res.status(400).json(err)
}
}

exports.employeeSignin = async(req,res)=>{
  try{
    console.log(req.body.Id)
    const { Id, password } = req.body;
  if (!Id || !password) {
    req.flash('error', 'Please provide username and password!');
    // return next(new AppError('Please provide username and password!', 400));
    return res.redirect('/');
  }
  const user = await db.Employee.findOne({ Id: Id }
  ).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    req.flash('error', 'Incorrect Id or password');
    return res.redirect('/');
  }
  createSendToken(user, 200, req, res);
}catch(err){
  console.log("signin failed")
  return res.redirect("/")
  // res.status(400).json(err)
}
}

exports.logout = (async (req, res, next) => {
    const newItem = { active: false };
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    
    
    if(req.params.role === "employee" || "admin" ){
    await db.Employee.findByIdAndUpdate(req.params.Id, newItem, err => {
      if (err) {
        // req.flash('error', err);
        return res.redirect('/');
      }
      // req.flash('success', `Looking forward to see you again`);
      return res.redirect('/');
    });
}else{
    await db.User.findByIdAndUpdate(req.params.id, newItem, err => {
        if (err) {
          // req.flash('error', err);
          return res.redirect('/');
        }
        // req.flash('success', `Looking forward to see you again`);
        return res.redirect('/');
      });
}
  });
  exports.getSignup = async(req, res, next) => {
    console.log("iscoming")
 return res.render("signup")
  }