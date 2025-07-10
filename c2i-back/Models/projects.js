const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  url: String,
  type: String,
});

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    media: [mediaSchema],
    technologies: [String],
    results: [String],
    category: String,
    type: String,
  },
  { timestamps: true }
);

// Clear existing model to force schema refresh
if (mongoose.connection.models["projects"]) {
  delete mongoose.connection.models["projects"];
}

const Project = mongoose.model("projects", projectSchema);

module.exports = Project;
