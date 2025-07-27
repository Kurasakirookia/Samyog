const express=require("express")
const router=express.Router();
const {createEvent,  updateEvent,deleteEvent, getAllEvents,getOneEvent} = require("../controllers/adminController");



const { protect ,adminOnly } = require("../middleware/authMiddleware");


// Protect all admin --------------------

router.use(protect);
router.use(adminOnly);

// Define Event Routes
router.get("/events", getAllEvents)
router.get("/events/:id",getOneEvent)
router.post("/events", createEvent);             // Create
router.put("/events/:id", updateEvent);          // Update
router.delete("/events/:id", deleteEvent);       // Delete
// router.get("/events", getAllEvents);             // Get all

module.exports = router;