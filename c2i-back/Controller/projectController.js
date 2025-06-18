const Project = require('../Models/projects');


exports.createProject = async (req, res) => {
  try {
    const { title } = req.body;
    const checkProject = await Project.findOne({ title });
    if (checkProject) {
      return res.status(400).json({ error: "Project already exists" });
    }
    const newProject = await Project.create(req.body);
    return res.status(201).json(newProject);
  } catch (e) {
    console.log("Error creating project:", e.message);
    return res.status(500).json({ error: "Failed to create project", details: e.message });
  }
};


exports.SeeProject = async (req, res) => {
    try {
        const Projects = await Project.find({});
        return res.json(Projects);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }
};


exports.SeeOneProject = async (req, res) => {
    try {
        const ProjectId = req.params.id;
        const project = await Project.findById(ProjectId);

        return res.json(project);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }
};





exports.updateProject = async (req, res) => {
    try {
        const ProjectId = req.params.id;
        const updateData = req.body;
        const updatedProject = await Project.findByIdAndUpdate(ProjectId, updateData, { new: true });
        if (!updatedProject) {
            return res.json({ message: "Project not found" });
        }
        return res.json(updatedProject);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }
};


exports.deleteProject = async (req, res) => {
    try {
        const ProjectId = req.params.id;
        const ProjecttoDelete = await Project.findByIdAndDelete(ProjectId)
        return res.json(ProjecttoDelete)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }

}