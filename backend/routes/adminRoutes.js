const express=require("express")
const router=express.Router();
const {createEvent,  updateEvent,deleteEvent, getAllEvents,getOneEvent, getAllTeachers, getOneTeacher, createTeacher, updateTeacher, deleteTeacher} = require("../controllers/adminController");
const upload = require("../middleware/uploadMiddleware");


const { protect ,adminOnly } = require("../middleware/authMiddleware");


// Protect all admin --------------------

router.use(protect);
router.use(adminOnly);

// Define Event Routes
router.get("/events", getAllEvents)
router.get("/events/:id",getOneEvent)
router.post("/events", upload.single("image"), createEvent);           // Create
router.put("/events/:id", upload.single("image"), updateEvent);   // Update
router.delete("/events/:id", deleteEvent);

router.get("/teachers", getAllTeachers)
router.get("/teachers/:id",getOneTeacher)
router.post("/teachers", upload.single("image"), createTeacher);              // Create
router.put("/teachers/:id",  upload.single("image"),updateTeacher);          // Update
router.delete("/teachers/:id", deleteTeacher);       // Delete
// router.get("/events", getAllEvents);             // Get all

module.exports = router;