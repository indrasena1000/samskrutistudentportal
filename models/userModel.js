const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
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
    hallTicket: {
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
    booksTaken:[{
      bookName:{type:String},
      bookId:{type:String}
      }],
    projects:{type:String},
    category:{type:String},
    stream:{type:String,
    enum:["MBA","Engineering","Pharmacy","Polytechnic"],
    required: [true, 'Please specify your gender']},
    branch:{
    type:String,
    required: [true, 'Please specify your gender']
    },
    feeDetails:[{
      semister:{type:String},
      tutionFee:{type:String},
    }],
    marks:[{
      semister:[{
        semisterNumber:{type:String},
        subjects:[{
          subjectName:{type:String},
          marks:{type:Number}
        }],
        totalSemisterMarks:{type:Number}
      }],
     totalMarks:{type:Number}
    }],
    attendance:{
      monthName:{type:String},
      attendancePercentage:{type:String}
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    passwordChangedAt: Date,
    role: { type: String },
    active: { type: Boolean },
  
    unauthorized: [
      {
        date: { type: Date },
        url: { type: String }
      }
    ]
  });
  
  userSchema.pre('save', async function(next) {
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
  
  userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  
  userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
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
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;

// var mongoose=require('mongoose');


// const userSchema= new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
       
//         lowercase:true,
//         trim: true
//     },
//     employeeId:{
//         type: String,
//         lowercase:true,
//         trim: true,
//         unique: true
//     },
//     hallTicket: {
//         type: String,
//         lowercase:true,
//         trim: true,
//         unique: true,
//         maxlength:10
//     },
//     profilepic:{type:String,default:`http:localhost:3003/userprofiles/defaultprofilepic.png`},
//     password: {
//         type: String
//     },
//     role: {
//         type:String,
//         enum:["student","employee","Admin"],
//         default:"student"
//     },
//     Seat:{type:String},
//     Mobile:{type:Number},
//     Scholarship:{type:Boolean},
//     presentSemester:{type:String},
//     token:{
//         type: String
//     },
//     Backlogs:[{
//         type:String
//     }],
//     Category:{type:String},
//     // Graduation:{
//     //     type:String,
//     //     enum:["Engineering","Diploma","Pharmacy"],
        
//     // },
//     Attendance:{type:Number},
//     Engineering:{
//         regulation:{type:String},
//         yearsOfStudy:{type:String},
//     stream:{
//         type:String,
//         enum:["CSE","ECE","MECH","CIVIL","EEE"]
//     },
//     LibraryBooks:[{
//         BookName:{type:String},
//         startDate:{type:Date},
//         endDate:{type:Date}
//     }],
//      Subjects:{   
//          sem1:[],
//          sem2:[],
//          sem3:[],
//          sem4:[],
//          sem5:[],
//          sem6:[],
//          sem7:[],
//          sem8:[]
//     },
//     presentMarks:[{
    
//     }]
// },
//    Diploma:{
//     stream:{
//         type:String,
//         enum:[]
//     },
//     presentMarks:[{
   
//     }]
//    },
//    Pharmacy:{
//     stream:{
//         type:String,
//         enum:[]
//     },
//     presentMarks:[{
   
//     }]
//    },
//     createdAt:{type: Date,
//         default: Date.now()}
// })
   


//     module.exports = mongoose.model("User", userSchema);