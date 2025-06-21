const Project = require('../Models/Projects');

exports.createProject = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("File:", req.file);

    const { title, description, technologies, results, category, type } = req.body;

    if (!title || !description || !category || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let parsedTechnologies = [];
    let parsedResults = [];

    // Only parse if it's a string
    if (typeof technologies === 'string') {
      parsedTechnologies = technologies.split(',').map(t => t.trim());
    } else {
      parsedTechnologies = technologies || [];
    }

    if (typeof results === 'string') {
      parsedResults = results.split(',').map(r => r.trim());
    } else {
      parsedResults = results || [];
    }

    const newProject = new Project({
      title,
      description,
      technologies: parsedTechnologies,
      results: parsedResults,
      category,
      type,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });

    await newProject.save();
    
    return res.status(201).json(newProject);

  } catch (e) {
    console.error("Error creating project:", e.message);
    
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({ 
      error: "Failed to create project", 
      details: e.message 
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
      error: error.message 
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

exports.updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const updateData = req.body;

    // Convert technologies/results from string to array if needed
    if (updateData.technologies && typeof updateData.technologies === 'string') {
      updateData.technologies = JSON.parse(updateData.technologies);
    }

    if (updateData.results && typeof updateData.results === 'string') {
      updateData.results = JSON.parse(updateData.results);
    }

    const updatedProject = await Project.findByIdAndUpdate(projectId, updateData, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.json(updatedProject);
  } catch (error) {
    console.error("Update error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.json(deletedProject);
  } catch (error) {
    console.error("Delete error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};