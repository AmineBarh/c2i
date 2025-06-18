const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  technologies: [String],
  results: [String],
  category: String,
  type: String,
  createdAt: Date,
  updatedAt: Date
}, { timestamps: true });


module.exports = mongoose.model("projects", projectSchema);
