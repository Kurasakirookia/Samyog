const asyncHandler=require("express-async-handler");
const Event=require("../models/EventModel");
const Teacher=require("../models/TeacherModel");
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
  const {title,description,startdate,enddate,venue,branch,createdBy}=req.body;

 
  if(!title ||!startdate||!enddate){
    res.status(400);
    throw new Error("title and dates are needed");
  }
    // const imagePath = req.file ? req.file.path : null;
    const imagePath = req.file ? `uploads/${req.file.filename}` : null;

  if (!imagePath) {
    return res.status(400).json({ message: "Image upload failed." });
  }
  const event =await Event.create(
    {
      title,
      description,
      startdate,
      enddate,
      venue,
      image:imagePath,
      branch,
      createdBy:req.user?.id||null,
    }
  );
  
      // 
    await event.save();
  res.status(201).json({ message: "Event created", event });
});

// @desc    Update event
// @route   PUT /api/admin/events/:id
// @access  Private/Admin

const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, startdate, enddate, venue, branch } = req.body;

  const event = await Event.findById(id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  event.title = title || event.title;
  event.description = description || event.description;
  event.startdate = startdate || event.startdate;
  event.enddate = enddate || event.enddate;
  event.venue = venue || event.venue;
  event.branch = branch || event.branch;

if (req.file) {
  event.image = `uploads/${req.file.filename}`;
}


  const updatedEvent = await event.save();

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

// ==================== TEACHER CRUD FUNCTIONS ====================

// @desc    Get all teachers
// @route   GET /api/admin/teachers
// @access  Private/Admin
const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find().sort({ createdAt: -1 }); // latest teachers first
  res.status(200).json(teachers);
});

// @desc    Get single teacher
// @route   GET /api/admin/teachers/:id
// @access  Private/Admin
const getOneTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    res.status(404);
    throw new Error(`Teacher with ID ${req.params.id} not found`);
  }

  res.status(200).json(teacher); // ✅ use 200 for a successful GET
});

// @desc    Create new teacher
// @route   POST /api/admin/teachers
// @access  Private/Admin
const createTeacher = asyncHandler(async (req, res) => {
  console.log("Incoming request body:", req.body);
  const { name,branch,description,designation,email,contactNumber } = req.body;
  
  if (!name || !description || !designation) {
    res.status(400);
    throw new Error("Name, branch and designation are required");
  }
  const imagePath = req.file ? `uploads/${req.file.filename}` : null;
  if (!imagePath) {
    return res.status(400).json({ message: "Image upload failed." });
  }
  const teacher = await Teacher.create({
    name,
    branch,
    description,
    designation,
    email,
    image:imagePath,
    contactNumber,
  });
  await teacher.save();
  res.status(201).json(teacher);
});

// @desc    Update teacher
// @route   PUT /api/admin/teachers/:id
// @access  Private/Admin
const updateTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, branch, description, designation, email,contactNumber } = req.body;
  // 1. Find teacher by ID
  const teacher = await Teacher.findById(id);

  if (!teacher) {
    res.status(404);
    throw new Error("Teacher not found");
  }

  teacher.name=name ||teacher.name;
  teacher.branch= branch ||teacher.branch;
  teacher.description =description ||teacher.description;
  teacher.designation=designation ||teacher.designation;
  teacher.email=email||teacher.email;
  teacher.contactNumber=contactNumber||teacher.contactNumber;

  if (req.file) {
  teacher.image = `uploads/${req.file.filename}`;
  }

   
  const updatedTeacher = await teacher.save();

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

  res.status(200).json({ 
    message: `Teacher with ID ${id} deleted successfully`,
    teacher 
  });
});

module.exports = {
  createEvent, 
  updateEvent, 
  deleteEvent, 
  getAllEvents,
  getOneEvent,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getAllTeachers,
  getOneTeacher
};