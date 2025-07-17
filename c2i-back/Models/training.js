const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    description: String,
    instructor: String,
    locations: String,
    technologies: [String],
    media: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Training", trainingSchema);
