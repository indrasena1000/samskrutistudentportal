require('dotenv').config();
const db = require("../models/index")

exports.getDashboard = (async (req, res, next) => { 
    console.log(req.user)
user = req.user
    return res.render("adminDashboard.ejs",{user})
})