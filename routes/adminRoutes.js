const express = require('express');
const db = require('../models');

const router = express.Router();
const {getDashboard} = require("../controllers/adminController")
const { isAdmin } = require('../middleware/index');

router.get('/dashboard', isAdmin, getDashboard);

module.exports = router;
