const asyncHandler=require("express-async-handler");
const Event=require("../models/EventModel");
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

module.exports = {createEvent, updateEvent, deleteEvent, getAllEvents,getOneEvent};