require('dotenv').config();
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const db = require('../models/index.js');
const { error } = require('console');

exports.protect = (async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next('You are not logged in! Please log in to get access.', 401
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists

  const currentuser = await db.Employee.findById(decoded.id);

if(currentuser ==undefined){
  const presentUser = await db.User.findById(decoded.id)
  currentUser = presentUser
  if (!presentUser) {
    return next('The user belonging to this token no longer exist.', 401)
  
  }
}else{
  currentUser = currentuser
}

  

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next('User recently changed password! Please log in again.', 401)
    
  }
  if (currentUser.onhold) {
    req.flash('error', 'Account on Hold Please contact Administrator');
    return res.redirect('/auth/signin');
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.currentUser = currentUser;
  res.locals.role = currentUser.role;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await db.Employee.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};
