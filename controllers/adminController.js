require('dotenv').config();
const db = require("../models/index")

exports.getDashboard = (async (req, res, next) => { 
    console.log(req.user)
user = req.user
    return res.render("adminDashboard.ejs")
})

exports.addSubjects = (async (req, res, next) => { 
    const user = req.user
    
console.log("holder")
    return res.render("./student/addSubjects.ejs",{user})
})

exports.addQualification = (async (req, res, next) => { 
    console.log("qualify")
    const user = req.user
   
    let allqualifications = await db.Qualification.find({})
   
console.log("holder")
    return res.render("./student/addQualifications.ejs",{user,allqualifications})
})

exports.addBranch = (async (req, res, next) => { 
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