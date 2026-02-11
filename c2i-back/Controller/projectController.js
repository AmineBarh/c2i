const Project = require("../Models/Projects");
const fs = require("fs");



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
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, technologies, results, category, type } =
      req.body;

    console.log("Updating project:", id);
    console.log("Request Body:", req.body);
    console.log("Files:", req.files);

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update fields if they are provided in the request
    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (category !== undefined) project.category = category;
    if (type !== undefined) project.type = type;

    // Handle array fields (technologies, results)
    // We check for undefined to allow partial updates, but handle empty strings as clearing the array
    if (technologies !== undefined) {
      if (typeof technologies === "string") {
        // Split by comma, trim, and remove empty strings
        project.technologies = technologies
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t.length > 0);
      } else if (Array.isArray(technologies)) {
        project.technologies = technologies
          .map((t) => (typeof t === "string" ? t.trim() : t))
          .filter((t) => t && t.length > 0);
      } else {
        // Fallback for null/other types
        project.technologies = [];
      }
    }

    if (results !== undefined) {
      if (typeof results === "string") {
        project.results = results
          .split(",")
          .map((r) => r.trim())
          .filter((r) => r.length > 0);
      } else if (Array.isArray(results)) {
        project.results = results
          .map((r) => (typeof r === "string" ? r.trim() : r))
          .filter((r) => r && r.length > 0);
      } else {
        project.results = [];
      }
    }

    // Handle new media uploads
    if (req.files && req.files.length > 0) {
      const newMedia = req.files.map((file) => ({
        url: `/uploads/${file.filename}`,
        type: file.mimetype.startsWith("image") ? "image" : "video",
      }));
      project.media = [...project.media, ...newMedia];
    }

    // Check if media deletion was requested (optional enhancement, but good for completeness)
    // If you implemented media deletion logic in frontend, handle it here.
    // For now, we just append new media as per previous logic.

    await project.save();

    return res.json(project);
  } catch (error) {
    console.error("Error updating project:", error.message);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

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
      parsedTechnologies = technologies
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
    } else if (Array.isArray(technologies)) {
      parsedTechnologies = technologies;
    }

    if (typeof results === "string") {
      parsedResults = results
        .split(",")
        .map((r) => r.trim())
        .filter((r) => r.length > 0);
    } else if (Array.isArray(results)) {
      parsedResults = results;
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
