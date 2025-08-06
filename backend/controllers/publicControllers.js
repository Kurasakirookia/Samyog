const asyncHandler = require("express-async-handler");
const Event = require("../models/EventModel");
const Teacher = require("../models/TeacherModel");

// @desc    Get all events for public view
// @route   GET /api/public/events
// @access  Public
const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find()
    .select('-createdBy') // Hide internal fields from public
    .sort({ date: -1 }); // Latest events first
  
  res.status(200).json({
    success: true,
    count: events.length,
    data: events
  });
});

// @desc    Get all teachers for public view
// @route   GET /api/public/teachers
// @access  Public

const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find();

  // Define the designation priority
  const designationOrder = {
    "HOD": 1,
    "Professor": 2,
    "Associate Professor": 3,
    "Assistant Professor": 4,
    "Non-teaching": 5
  };

  // Sort teachers based on designation rank
  const sortedTeachers = teachers.sort((a, b) => {
    const aRankKey = Object.keys(designationOrder).find(key =>
      a.designation?.toLowerCase().includes(key.toLowerCase())
    );
    const bRankKey = Object.keys(designationOrder).find(key =>
      b.designation?.toLowerCase().includes(key.toLowerCase())
    );

    const aRank = designationOrder[aRankKey] || 99;
    const bRank = designationOrder[bRankKey] || 99;

    return aRank - bRank;
  });

  res.status(200).json({
    success: true,
    data: sortedTeachers
  });
});

// @desc    Get about information
// @route   GET /api/public/about
// @access  Public
const getAboutInfo = asyncHandler(async (req, res) => {
  const aboutInfo = {
    title: "Student Club Portal",
    description: "Welcome to the Student Club Portal! We are dedicated to organizing events, workshops, competitions, and fostering a vibrant academic community.",
    mission: "To provide students with opportunities for personal growth, skill development, and community engagement through various activities and events.",
    vision: "To be the leading platform for student activities and create lasting memories while building professional networks.",
    features: [
      "Event Management and Organization",
      "Workshop and Seminar Coordination",
      "Competition Hosting",
      "Faculty and Student Networking",
      "Skill Development Programs"
    ],
    established: "2020",
    activeMembers: "500+"
  };

  res.status(200).json({
    success: true,
    data: aboutInfo
  });
});

// @desc    Get contact information
// @route   GET /api/public/contact
// @access  Public
const getContactInfo = asyncHandler(async (req, res) => {
  const contactInfo = {
    email: "club@college.edu",
    phone: "+91 9876543210",
    address: "Room 204, Main Block, XYZ College",
    socialMedia: {
      facebook: "https://facebook.com/studentclub",
      twitter: "https://twitter.com/studentclub",
      instagram: "https://instagram.com/studentclub",
      linkedin: "https://linkedin.com/company/studentclub"
    },
    officeHours: {
      weekdays: "9:00 AM - 5:00 PM",
      weekend: "10:00 AM - 2:00 PM"
    },
    location: {
      coordinates: {
        latitude: 12.9716,
        longitude: 77.5946
      },
      mapUrl: "https://maps.google.com/..."
    }
  };

  res.status(200).json({
    success: true,
    data: contactInfo
  });
});

// @desc    Get single event details for public
// @route   GET /api/public/events/:id
// @access  Public
const getEventDetails = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)
    .select('-createdBy'); // Hide internal fields

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  res.status(200).json({
    success: true,
    data: event
  });
});

// @desc    Get teachers by branch
// @route   GET /api/public/teachers/branch/:branch
// @access  Public
const getTeachersByBranch = asyncHandler(async (req, res) => {
  const { branch } = req.params;
  
  const teachers = await Teacher.find({ 
    branch: { $regex: branch, $options: 'i' } // Case insensitive search
  })
  .select('-contactNumber -email')
  .lean();

  // Apply same sorting logic as getAllTeachers
  const designationOrder = {
    'Principal': 1,
    'Vice Principal': 2,
    'Dean': 3,
    'Associate Dean': 4,
    'HOD': 5,
    'Head of Department': 5,
    'Professor': 6,
    'Associate Professor': 7,
    'Assistant Professor': 8,
    'Lecturer': 9,
    'Senior Lecturer': 7.5,
    'Junior Lecturer': 10,
    'Instructor': 11
  };

  const sortedTeachers = teachers.sort((a, b) => {
    const aOrder = designationOrder[a.designation] || 12;
    const bOrder = designationOrder[b.designation] || 12;
    
    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }
    
    return a.name.localeCompare(b.name);
  });

  res.status(200).json({
    success: true,
    branch: branch,
    count: sortedTeachers.length,
    data: sortedTeachers
  });
});

module.exports = {
  getAllEvents,
  getAllTeachers,
  getAboutInfo,
  getContactInfo,
  getEventDetails,
  getTeachersByBranch,
};