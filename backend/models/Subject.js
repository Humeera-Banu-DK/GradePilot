const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectCode: String,
  subjectName: String,
  credits: Number,
  semester: Number,
  branch: String,
  regulation: String
});

module.exports = mongoose.model("Subject", subjectSchema);
