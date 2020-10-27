const express = require("express");
const router = express.Router();

const {register,studentSignin,getSignup,employeeSignin,logout} = require("../controllers/authController");

router.get("/getsignup",getSignup)
 router.post("/user/signup",register)
router.post("/user/signin",studentSignin)
router.post("/employee/signin",employeeSignin)
router.get("/user/logout/:role/:Id",logout)
module.exports = router;