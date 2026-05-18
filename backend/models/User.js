const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  branch: { type: String, required: true },
  regulation: { type: String, required: true },
  semester: { type: Number, required: true }
});

module.exports = mongoose.model("User", userSchema);
