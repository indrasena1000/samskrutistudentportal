const express = require("express");
const db = require("../models/index")

exports.studentDashboard = async(req,res)=>{
    return res.render("student_dashboard.ejs")

}
