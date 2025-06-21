const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  technologies: [String],
  results: [String],
  category: String,
  type: String
}, { timestamps: true });

const Project = mongoose.models.projects || mongoose.model("projects", projectSchema);

module.exports = Project;