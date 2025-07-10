const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    description: String,
    instructor: String,
    locations: String,
    technologies: [String],
    media: String,
  },
  { timestamps: true } // adds createdAt, updatedAt
);

module.exports = mongoose.model("Training", trainingSchema);
