// models/eventModel.js
const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
    },
    description: {
      type: String,
    },
    startdate: {
      type: String,
      required: [true, "Event date is required"],
    },
    enddate:{
       type: String,
      required: [true, "Event date is required"],
    },
    venue: {
      type: String,
    },
    image: {
      type: String, // URL to the poster or flyer
    },
    branch: {
      type: String, // e.g., "CSE", "ECE"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to admin
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
