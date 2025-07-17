const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    trainingId: String,
    trainingTitle: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    company: String,
    jobTitle: String,
    teamSize: String,
    preferredLocation: String,
    preferredDates: String,
    specificRequirements: String,
    budget: String,
    urgency: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", quoteSchema);
