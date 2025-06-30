const express = require("express");
const {
  addPartner,
  getPartners,
  deletePartner,
} = require("../Controller/partnerscontroller");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", upload.single("image"), addPartner);
router.get("/", getPartners);
router.delete("/:id", deletePartner);

module.exports = router;
