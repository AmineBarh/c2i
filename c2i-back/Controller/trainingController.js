const Training = require("../Models/training");
const cloudinary = require("../utils/cloudinary");

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
      if (req.file && req.file.filename) {
          await cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(400).json({ error: "Missing required fields!" });
    }

    // Parse array fields (handle both string and array inputs)
    const parseArray = (field) =>
      Array.isArray(field)
        ? field
        : field.split(",").map((item) => item.trim());

    // Handle file uploads (if any)
    // Training schema expects a string for media (URL)
    const media = req.file ? req.file.path : "";

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
    if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
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
          // Try to extract public_id from Cloudinary URL if possible
          // Cloudinary URLs usually have the public_id at the end, but getting it reliable requires parsing.
          // However, for now we might rely on the fact that if it was uploaded via Cloudinary, we might be able to get it.
          // But since the schema stores only the URL string, we don't have the public_id stored separately.
          // We can try to extract it:
          // https://res.cloudinary.com/demo/image/upload/v1/folder/filename.jpg -> folder/filename

          try {
             // Basic extraction logic:
             // 1. Split by '/'
             // 2. Take the last part (filename.ext)
             // 3. Remove extension
             // 4. If there are folders, we need to know the folder name. We configured 'c2i_uploads'.

             // If the URL contains 'c2i_uploads', we can try to construct the public_id.
             if (existingTraining.media.includes('c2i_uploads')) {
                 const urlParts = existingTraining.media.split('/');
                 const filenameWithExt = urlParts[urlParts.length - 1];
                 const publicId = `c2i_uploads/${filenameWithExt.split('.')[0]}`;
                 await cloudinary.uploader.destroy(publicId);
             }
          } catch(err) {
              console.error("Failed to delete old image from Cloudinary:", err);
          }
      }

      // Add new media file
      media = req.file.path;
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
    if (req.file && req.file.filename) {
       await cloudinary.uploader.destroy(req.file.filename);
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
    if (training.media) {
        try {
             if (training.media.includes('c2i_uploads')) {
                 const urlParts = training.media.split('/');
                 const filenameWithExt = urlParts[urlParts.length - 1];
                 const publicId = `c2i_uploads/${filenameWithExt.split('.')[0]}`;
                 await cloudinary.uploader.destroy(publicId);
             }
        } catch (fileError) {
          console.error("File deletion error:", fileError.message);
        }
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
