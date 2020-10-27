const express = require('express');
const db = require('../models');

const router = express.Router();
const {getDashboard} = require("../controllers/adminController")


router.get('/dashboard', getDashboard);

module.exports = router;
