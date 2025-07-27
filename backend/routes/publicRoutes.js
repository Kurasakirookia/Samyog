const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  getAllTeachers,
  getAboutInfo,
  getContactInfo,
  getEventDetails,
  getTeachersByBranch,
} = require("../controllers/publicControllers");

// Event routes
router.get("/events", getAllEvents);
router.get("/events/:id", getEventDetails);

// Teacher routes
router.get("/teachers", getAllTeachers);
router.get("/teachers/branch/:branch", getTeachersByBranch);

// Information routes
router.get("/about", getAboutInfo);
router.get("/contact", getContactInfo);

module.exports = router;