const Training = require("../Models/training");
const fs = require("fs");
const path = require("path");

// Create Training with file upload handling
exports.createTraining = async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      category,
      locations,
      instructor,
      modules,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !category ||
      !technologies ||
      !locations ||
      !instructor ||
      !modules
    ) {
      if (req.files) {
        req.files.forEach((file) => fs.unlinkSync(file.path));
      }
      return res.status(400).json({ error: "Missing required fields!" });
    }

    // Parse array fields (handle both string and array inputs)
    const parseArray = (field) =>
      Array.isArray(field)
        ? field
        : field.split(",").map((item) => item.trim());

    // Handle file uploads (if any)
    const media =
      req.files?.map((file) => ({
        url: `/uploads/${file.filename}`,
        type: file.mimetype.startsWith("image") ? "image" : "video",
      })) || [];

    // Create new training
    const newTraining = new Training({
      title,
      description,
      technologies: parseArray(technologies),
      locations: parseArray(locations),
      modules: parseArray(modules),
      instructor,
      category,
      media,
    });

    await newTraining.save();
    res.status(201).json(newTraining);
  } catch (e) {
    console.error("Error:", e);
    if (req.files) {
      req.files.forEach((file) => fs.unlinkSync(file.path));
    }
    res.status(500).json({ error: "Server error: " + e.message });
  }
};
// Get all trainings
exports.getTrainings = async (req, res) => {
  try {
    const trainings = await Training.find({});
    return res.json(trainings);
  } catch (error) {
    console.error("Error fetching trainings:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Get one training by ID
exports.getTrainingById = async (req, res) => {
  try {
    const trainingId = req.params.id;
    const training = await Training.findById(trainingId);

    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }

    return res.json(training);
  } catch (error) {
    console.error("Error fetching training:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update one training by ID
// Update the updateTraining function
exports.updateTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      technologies,
      category,
      locations,
      instructor,
    } = req.body;

    // Find existing training
    const existingTraining = await Training.findById(id);
    if (!existingTraining) {
      return res.status(404).json({ error: "Training not found" });
    }

    // Parse technologies array
    const parseArray = (field) =>
      Array.isArray(field)
        ? field
        : field.split(",").map((item) => item.trim());

    // Handle file upload
    let media = existingTraining.media;
    if (req.file) {
      // Delete old media file
      if (existingTraining.media) {
        try {
          const filename = existingTraining.media.split("/").pop();
          const filePath = path.join(__dirname, "../uploads", filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (fileError) {
          console.error("File deletion error:", fileError.message);
        }
      }

      // Add new media file
      media = `/uploads/${req.file.filename}`;
    }

    // Update training
    const updatedTraining = await Training.findByIdAndUpdate(
      id,
      {
        title,
        description,
        technologies: parseArray(technologies),
        locations,
        instructor,
        category,
        media,
      },
      { new: true }
    );

    res.status(200).json(updatedTraining);
  } catch (e) {
    console.error("Update error:", e.message);
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error("Error deleting file:", unlinkError.message);
      }
    }
    res.status(500).json({ error: "Failed to update training" });
  }
};

// Delete training by ID
exports.deleteTraining = async (req, res) => {
  try {
    const trainingId = req.params.id;
    const training = await Training.findById(trainingId);

    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }

    // Delete associated media files
    if (training.media && training.media.length > 0) {
      training.media.forEach((mediaItem) => {
        try {
          const filename = mediaItem.url.split("/").pop();
          const filePath = path.join(__dirname, "../uploads", filename);

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log("Successfully deleted file:", filePath);
          } else {
            console.warn("File not found:", filePath);
          }
        } catch (fileError) {
          console.error("File deletion error:", fileError.message);
        }
      });
    }

    await Training.findByIdAndDelete(trainingId);

    return res.json({
      success: true,
      message: "Training deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
// Get unique training categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Training.distinct("category");
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
