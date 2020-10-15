var mongoose=require('mongoose');


const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
       
        lowercase:true,
        trim: true
    },
    // employeeId:{
    //     type: String,
    //     lowercase:true,
    //     trim: true,
    //     unique: true
    // },
    hallTicket: {
        type: String,
        lowercase:true,
        trim: true,
        unique: true,
        maxlength:10
    },
    profilepic:{type:String,default:`http:localhost:3003/userprofiles/defaultprofilepic.png`},
    password: {
        type: String
    },
    role: {
        type:String,
        enum:["student","employee","Admin"],
        default:"student"
    },
    Seat:{type:String},
    Mobile:{type:Number},
    Scholarship:{type:Boolean},
    presentSemester:{type:String},
    token:{
        type: String
    },
    Backlogs:[{
        type:String
    }],
    Category:{type:String},
    // Graduation:{
    //     type:String,
    //     enum:["Engineering","Diploma","Pharmacy"],
        
    // },
    Engineering:{
        regulation:{type:String},
        yearsOfStudy:{type:String},
    stream:{
        type:String,
        enum:["CSE","ECE","MECH","CIVIL","EEE"]
    },
    LibraryBooks:[{
        BookName:{type:String},
        startDate:{type:Date},
        endDate:{type:Date}
    }],
     Subjects:{   
         sem1:[],
         sem2:[],
         sem3:[],
         sem4:[],
         sem5:[],
         sem6:[],
         sem7:[],
         sem8:[]
    },
    presentMarks:[{
    
    }]
},
   Diploma:{
    stream:{
        type:String,
        enum:[]
    },
    presentMarks:[{
   
    }]
   },
   Pharmacy:{
    stream:{
        type:String,
        enum:[]
    },
    presentMarks:[{
   
    }]
   },
    createdAt:{type: Date,
        default: Date.now()}
})
   


    module.exports = mongoose.model("User", userSchema);