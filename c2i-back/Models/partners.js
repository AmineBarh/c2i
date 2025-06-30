const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
  type: String,
  img: String,
});

module.exports = mongoose.model("partners", PartnerSchema);
