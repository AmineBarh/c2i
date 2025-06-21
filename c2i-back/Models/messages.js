const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    name : String,
    email: String,
    phone : Number,
    message : String
});

module.exports = mongoose.model("Messages", messageSchema);