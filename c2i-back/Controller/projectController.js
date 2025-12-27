const Project = require("../Models/Projects");
const cloudinary = require("../utils/cloudinary");

exports.createProject = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Files:", req.files);

    const { title, description, technologies, results, category, type } =
      req.body;

    if (!title || !description || !category || !type) {
      // Clean up any uploaded files if validation fails
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          if (file.filename) {
             await cloudinary.uploader.destroy(file.filename);
          }
        }
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
    // Cloudinary returns file information in req.files
    // file.path contains the URL
    // file.mimetype contains the type
    const media = req.files
      ? req.files.map((file) => ({
          url: file.path,
          type: file.mimetype.startsWith("image") ? "image" : "video",
          public_id: file.filename, // Store public_id for easier deletion
        }))
      : [];

    const newProject = new Project({
      title,
      description,
      technologies: parsedTechnologies,
      results: parsedResults,
      category,
      type,
      media,
    });

    await newProject.save();

    return res.status(201).json(newProject);
  } catch (e) {
    console.error("Error creating project:", e.message);

    // Clean up any uploaded files on error
    if (req.files && req.files.length > 0) {
        for (const file of req.files) {
            if (file.filename) {
               await cloudinary.uploader.destroy(file.filename);
            }
        }
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


exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Delete associated media files from Cloudinary
    if (project.media && project.media.length > 0) {
      for (const mediaItem of project.media) {
        try {
            if (mediaItem.public_id) {
                await cloudinary.uploader.destroy(mediaItem.public_id);
            } else if (mediaItem.url && mediaItem.url.includes('c2i_uploads')) {
                // Fallback for cases where public_id might be missing but we can guess it
                const urlParts = mediaItem.url.split('/');
                 const filenameWithExt = urlParts[urlParts.length - 1];
                 const publicId = `c2i_uploads/${filenameWithExt.split('.')[0]}`;
                 await cloudinary.uploader.destroy(publicId);
            }
        } catch (fileError) {
          console.error("Cloudinary deletion error:", fileError.message);
        }
      }
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
