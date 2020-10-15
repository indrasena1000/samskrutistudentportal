const express = require("express");
const router = express.Router();

const {studentDashboard} = require("../controllers/studentController")

router.get("/dashboard",studentDashboard)

module.exports = router;