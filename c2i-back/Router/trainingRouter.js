const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // your multer config
const Training = require("../Models/training");
const {
  createTraining,
  deleteTraining,
  updateTraining,
  getCategories,
} = require("../Controller/trainingController");

// @desc    Create a new training program
// @route   POST /training/create

router.get("/training/categories", getCategories);

// Use controller function instead of inline handler to ensure consistency
router.post("/training/create", upload.single("media"), createTraining);

// @desc Get all trainings
router.get("/training", async (req, res) => {
  try {
    const trainings = await Training.find().sort({ createdAt: -1 });
    res.status(200).json(trainings);
  } catch (err) {
    console.error("Error fetching trainings:", err);
    res.status(500).json({ message: "Failed to fetch trainings" });
  }
});
router.delete("/training/delete/:id", deleteTraining);
// Add upload middleware to update route
router.put(
  "/training/update/:id",
  upload.single("media"), // Add this middleware
  updateTraining
);

module.exports = router;
