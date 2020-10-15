const express = require("express");
const router = express.Router();

const {studentDashboard
    ,studentAttendance,
    studentBacklogs,
    studentChangeMbNo,
    studentExamSchedule,
    studentMarks,
    studentProfile,
    studentProjectSearch,
    studentTimeTable} = require("../controllers/studentController")

router.get("/dashboard/:htno",studentDashboard)
router.get("/attendance/:htno",studentAttendance)
router.get("/backlogs/:htno",studentBacklogs)
router.get("/changembno/:htno",studentChangeMbNo)
router.get("/examschedule/:htno",studentExamSchedule)
router.get("/marks/:htno",studentMarks)
router.get("/profile/:htno",studentProfile)
router.get("/projectserach/:htno",studentProjectSearch)
router.get("/timetable/:htno",studentTimeTable)

module.exports = router;