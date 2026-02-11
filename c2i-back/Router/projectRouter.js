const express = require("express");
const {
  createProject,
  SeeProject,
  SeeOneProject,
  deleteProject,
  updateProject,
} = require("../Controller/projectController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/Projects/create", upload.array("media", 10), createProject);
router.get("/projects/", SeeProject);
router.get("/projects/:id", SeeOneProject);
router.delete("/projects/delete/:id", deleteProject);
router.put("/projects/update/:id", upload.array("media", 10), updateProject);

module.exports = router;
