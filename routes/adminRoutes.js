const express = require('express');
const db = require('../models');

const router = express.Router();
const {getDashboard,addSubjects,addQualification,addBranch,deleteBranch,
    getStudents,getEmployees} = require("../controllers/adminController")
const { isAdmin } = require('../middleware/index');

router.get('/dashboard', isAdmin, getDashboard);
router.get('/dashboard/addsubjects', isAdmin, addSubjects);
router.get('/dashboard/addqualification', isAdmin, addQualification);
router.post('/dashboards/add/branch', isAdmin, addBranch);
router.get('/dashboards/delete/branch/:branchId', isAdmin, deleteBranch);
router.get('/dashboard/students', isAdmin, getStudents);
router.get('/dashboard/employees', isAdmin, getEmployees);



module.exports = router;
