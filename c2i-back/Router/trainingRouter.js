const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // your multer config
const Training = require("../Models/training");
const {
  deleteTraining,
  updateTraining,
  getCategories,
} = require("../Controller/trainingController");

// @desc    Create a new training program
// @route   POST /training/create

router.get("/training/categories", getCategories);

router.post("/training/create", upload.single("media"), async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      instructor,
      locations,
      technologies,
    } = req.body;

    const newTraining = new Training({
      title,
      category,
      description,
      instructor,
      locations,
      technologies: technologies ? technologies.split(",") : [],
      media: req.file ? `/uploads/${req.file.filename}` : "",
    });

    const saved = await newTraining.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving training:", err);
    res.status(500).json({ message: "Failed to create training" });
  }
});

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
router.put("/training/update/:id", updateTraining);

module.exports = router;
