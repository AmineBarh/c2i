const express = require("express");
const {
  createProject,
  SeeProject,
  SeeOneProject,
  updateProject,
  deleteProject,
} = require("../Controller/projectController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/Projects/create", upload.array("media", 10), createProject);
router.get("/projects/", SeeProject);
router.get("/projects/:id", SeeOneProject);
router.put("/projects/update/:id", updateProject);
router.delete("/projects/delete/:id", deleteProject);

module.exports = router;
