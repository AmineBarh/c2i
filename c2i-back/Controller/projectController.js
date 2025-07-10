const Project = require("../Models/Projects");
const fs = require("fs");

exports.createProject = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Files:", req.files);

    const { title, description, technologies, results, category, type } =
      req.body;

    if (!title || !description || !category || !type) {
      // Clean up any uploaded files if validation fails
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          fs.unlinkSync(file.path);
        });
      }
      return res.status(400).json({ error: "Missing required fields" });
    }

    let parsedTechnologies = [];
    let parsedResults = [];

    if (typeof technologies === "string") {
      parsedTechnologies = technologies.split(",").map((t) => t.trim());
    } else {
      parsedTechnologies = technologies || [];
    }

    if (typeof results === "string") {
      parsedResults = results.split(",").map((r) => r.trim());
    } else {
      parsedResults = results || [];
    }

    // Create media array with type information
    const media = req.files
      ? req.files.map((file) => ({
          url: `/uploads/${file.filename}`,
          type: file.mimetype.startsWith("image") ? "image" : "video",
        }))
      : [];

    const newProject = new Project({
      title,
      description,
      technologies: parsedTechnologies,
      results: parsedResults,
      category,
      type,
      media, // Changed from image to media array
    });

    await newProject.save();

    return res.status(201).json(newProject);
  } catch (e) {
    console.error("Error creating project:", e.message);

    // Clean up any uploaded files on error
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        try {
          fs.unlinkSync(file.path);
        } catch (unlinkError) {
          console.error("Error deleting file:", unlinkError.message);
        }
      });
    }

    return res.status(500).json({
      error: "Failed to create project",
      details: e.message,
    });
  }
};

exports.SeeProject = async (req, res) => {
  try {
    const projects = await Project.find({});
    return res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.SeeOneProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const path = require("path"); // ADD THIS AT THE TOP

exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Delete associated media files
    if (project.media && project.media.length > 0) {
      project.media.forEach((mediaItem) => {
        try {
          // Get filename from URL
          const filename = mediaItem.url.split("/").pop();

          // Construct file path
          const filePath = path.join(__dirname, "../uploads", filename);

          // Debug logging
          console.log("Attempting to delete file:", filePath);
          console.log("File exists:", fs.existsSync(filePath));

          // Delete if exists
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

    // Delete from database
    await Project.findByIdAndDelete(projectId);

    return res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error.message);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
