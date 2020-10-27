const express = require("express");
const db = require("../models/index")

exports.studentDashboard = async(req,res)=>{
    console.log(req.user)
    user = req.user
        return res.render("student_dashboard.ejs",{user})
}

exports.studentAttendance = async(req,res)=>{
  const user = await db.User.findOne({hallTicket:req.params.htno})
    return res.render("./student/Attendance.ejs",{user})
}

exports.studentBacklogs = async(req,res)=>{
    const user = await db.User.findOne({hallTicket:req.params.htno})
    return res.render("./student/backlogs",{user})
}

exports.studentChangeMbNo = async(req,res)=>{
    const user = await db.User.findOne({hallTicket:req.params.htno})
    return res.render("./student/changeMobile",{user})
}

exports.studentExamSchedule = async(req,res)=>{
    const user = await db.User.findOne({hallTicket:req.params.htno})
    return res.render("./student/examsSchedule",{user})
}

exports.studentMarks = async(req,res)=>{
    const user = await db.User.findOne({hallTicket:req.params.htno})
    return res.render("./student/marks",{user})
}

exports.studentProfile = async(req,res)=>{
    const user = await db.User.findOne({hallTicket:req.params.htno})
    return res.render("./student/profile",{user})
}

exports.studentProjectSearch = async(req,res)=>{
    const user = await db.User.findOne({hallTicket:req.params.htno})
    return res.render("./student/projectSearch",{user})
}

exports.studentTimeTable = async(req,res)=>{
    const user = await db.User.findOne({hallTicket:req.params.htno})
    return res.render("./student/timeTable",{user})
}


