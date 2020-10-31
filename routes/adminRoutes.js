const express = require('express');
const db = require('../models');

const router = express.Router();
const {getDashboard,addSubjects,addQualification,addBranch,deleteBranch} = require("../controllers/adminController")
const { isAdmin } = require('../middleware/index');

router.get('/dashboard', isAdmin, getDashboard);
router.get('/dashboard/addsubjects', isAdmin, addSubjects);
router.get('/dashboard/addqualification', isAdmin, addQualification);
router.post('/dashboards/add/branch', isAdmin, addBranch);
router.get('/dashboards/delete/branch/:branchId', isAdmin, deleteBranch);

module.exports = router;
