const express = require("express");
const { 
  createProject, 
  SeeProject, 
  SeeOneProject, 
  updateProject, 
  deleteProject 
} = require("../Controller/projectController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/projects/create", (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    await createProject(req, res);
  });
});

router.post("/projects/create", upload.single('image'), createProject);
router.get("/projects/", SeeProject);
router.get("/projects/:id", SeeOneProject);
router.put("/projects/update/:id", updateProject);
router.delete("/projects/delete/:id", deleteProject);


module.exports = router;