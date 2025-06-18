const express = require("express");
const { createProject, SeeProject, SeeOneProject, updateProject, deleteProject } = require("../Controller/projectController");

const router = express.Router();

router.post("/Projects/create", createProject);
router.get("/Projects/", SeeProject);
router.get("/Projects/:id", SeeOneProject);
router.put("/Projects/update/:id", updateProject);
router.delete("/Projects/delete/:id", deleteProject);


module.exports = router;