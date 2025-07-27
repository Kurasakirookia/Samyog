// models/facultyModel.js
const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Faculty name is required"],
    },
    branch: {
      type: String,
      required: [true, "Branch is required"],
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
    },
    email: {
      type: String,
    },
    image:{
      type:String,
    },
    contactNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", teacherSchema);
