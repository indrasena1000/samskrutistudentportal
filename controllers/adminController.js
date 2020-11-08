require('dotenv').config();
const db = require("../models/index")

exports.getDashboard = (async (req, res, next) => { 
    console.log(req.user)
user = req.user
    return res.render("adminDashboard.ejs")
})

exports.addSubjects = (async (req, res, next) => { 
    const user = req.user
    
console.log("holder");
var streams=[
    {Engineering:[]},
    {MBA:[]},
    {Polytechnic:[]},
    {Pharmacy:[]}
]
let streamss=await db.Qualification.find({})
console.log(streamss)
for(var stream of streamss){
    if(stream.stream=="Engineering"){
        streams[0].Engineering.push(stream.branch)
    }else if(stream.stream=="MBA"){
        streams[1].MBA.push(stream.branch)
    }else if(stream.stream=="Polytechnic"){
        streams[2].Polytechnic.push(stream.branch)
    } else if(stream.stream=="Pharmacy"){
        streams[3].Pharmacy.push(stream.branch)
    }
}
console.log(streams)
    return res.render("./student/addSubjects.ejs",{user,streams})
})

exports.addQualification = (async (req, res, next) => { 
    console.log("qualify")
    const user = req.user
    
    let allqualifications = await db.Qualification.find({})
   
console.log("holder")
    return res.render("./student/addQualifications.ejs",{user,allqualifications})
})

exports.addBranch = (async (req, res, next) => { 
    console.log("hello")
    console.log(req.body.stream)
    console.log(req.body.branch)
     newbranch = await db.Qualification.create(req.body)
  if(newbranch=null){
//    req.flash("error","adding qualification failed")
    return res.redirect("/admin/dashboard/addqualification")
  }
//   req.flash("success","adding qualification successfully")
    return res.redirect("/admin/dashboard/addqualification")

})

exports.deleteBranch = (async (req, res, next) => { 
  await db.Qualification.findByIdAndDelete(req.params.branchId)
  console.log("deleted")
  return res.redirect("/admin/dashboard/addqualification")

})

exports.getStudents = (async (req, res, next) => { 
    user = req.user
    return res.render("./student/students",{
        user
    })

})

exports.getEmployees = (async (req, res, next) => { 
    user = req.user
    return res.render("./student/employees",{
        user
    })

})