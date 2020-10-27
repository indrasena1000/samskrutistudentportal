const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const empSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please tell us your name!']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    Id: {
      type: String,
      lowercase:true,
      required: [true, 'Please provide a username'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 1
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
      unique: true
    },
    profilePic: { type: String, default: '' },
    gender: {
      type: String,
      required: [true, 'Please specify your gender']
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    passwordChangedAt: Date,
    role: { type: String },
    active: { type: Boolean },
    onhold: { type: Boolean, default: false },
    category:{type:String},
    unauthorized: [
      {
        date: { type: Date },
        url: { type: String }
      }
    ]
  });
  
  empSchema.pre('save', async function(next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      this.password = await bcrypt.hash(this.password, 12);
      return next();
    } catch (err) {
      return next(new AppError(err, 400));
    }
  });
  
  empSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  
  empSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
  };
  const Employee = mongoose.model('Employee', empSchema);
  
  module.exports = Employee;