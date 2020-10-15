const express = require("express");
const router = express.Router();

const {register,signin,logout} = require("../controllers/authController");

router.post("/user/signup",register)
router.post("/user/signin",signin)
router.get("/user/logout",logout)
module.exports = router;