const asyncHandler=require("express-async-handler");
const Event=require("../models/EventModel");
const Teacher = require("../models/TeacherModel");
// @desc    Create new event
// @route   POST /api/admin/events
// @access  Private/Admin

//

const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 }); // latest events first
  res.status(200).json(events);
});

const getOneEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error(`Event with ID ${req.params.id} not found`);
  }

  res.status(200).json(event); // ✅ use 200 for a successful GET
});
const createEvent = asyncHandler(async (req, res) => {
  console.log("Incoming request body:", req.body);
  const {title,description,date,venue,image,branch,createdBy}=req.body;
  if(!title ||!date){
    res.status(400);
    throw new Error("title and dates are needed");
  }
  const event =await Event.create(
    {
      title,
      description,
      date,
      venue,
      image,
      branch,
      createdBy:req.user?.id||null,
    }
  );
  
      // 
    res.status(201).json(event);
});

// @desc    Update event
// @route   PUT /api/admin/events/:id
// @access  Private/Admin


const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // 1. Find event by ID
  const event = await Event.findById(id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  // 2. Update event fields
  const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
    new: true,           // return the updated document
    runValidators: true, // ensure validation rules are respected
  });

  res.status(200).json({
    message: "Event updated successfully",
    event: updatedEvent,
  });

});

// @desc    Delete event
// @route   DELETE /api/admin/events/:id
// @access  Private/Admin


const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // 1. Find event by ID
  const event = await Event.findById(id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  // 2. Delete the event
  await event.deleteOne();

  res.status(200).json({ message: `Event with ID ${id} deleted successfully`,event });
});  

// ------------------------------ Teacher CRUD ---------------------------------

// @desc    Get all teachers
// @route   GET /api/admin/teachers
// @access  Private/Admin
const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find().sort({ createdAt: -1 }); // latest teachers first
  res.status(200).json(teachers);
});

// @desc    Get single teacher by ID
// @route   GET /api/admin/teachers/:id
// @access  Private/Admin
const getOneTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    res.status(404);
    throw new Error(`Teacher with ID ${req.params.id} not found`);
  }

  res.status(200).json(teacher);
});

// @desc    Create a new teacher
// @route   POST /api/admin/teachers
// @access  Private/Admin
const createTeacher = asyncHandler(async (req, res) => {
  const { name, branch, designation, email, image, contactNumber } = req.body;

  // Basic validation
  if (!name || !branch || !designation) {
    res.status(400);
    throw new Error("Name, branch and designation are required");
  }

  const teacher = await Teacher.create({
    name,
    branch,
    designation,
    email,
    image,
    contactNumber,
    createdBy: req.user?.id || null,
  });

  res.status(201).json(teacher);
});

// @desc    Update teacher
// @route   PUT /api/admin/teachers/:id
// @access  Private/Admin
const updateTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // 1. Find teacher by ID
  const teacher = await Teacher.findById(id);

  if (!teacher) {
    res.status(404);
    throw new Error("Teacher not found");
  }

  // 2. Update teacher fields
  const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, {
    new: true, // return the updated document
    runValidators: true, // ensure validation rules are respected
  });

  res.status(200).json({
    message: "Teacher updated successfully",
    teacher: updatedTeacher,
  });
});

// @desc    Delete teacher
// @route   DELETE /api/admin/teachers/:id
// @access  Private/Admin
const deleteTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // 1. Find teacher by ID
  const teacher = await Teacher.findById(id);

  if (!teacher) {
    res.status(404);
    throw new Error("Teacher not found");
  }

  // 2. Delete the teacher
  await teacher.deleteOne();

  res.status(200).json({ message: `Teacher with ID ${id} deleted successfully`, teacher });
});

module.exports = {
  // Event handlers
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getOneEvent,
  // Teacher handlers
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getAllTeachers,
  getOneTeacher,
};