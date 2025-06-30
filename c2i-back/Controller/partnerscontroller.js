const Partner = require("../Models/partners");
const fs = require("fs");
const path = require("path");

exports.addPartner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newPartner = new Partner({
      type: req.body.type,
      img: req.file.filename,
    });

    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (error) {
    console.error("Error creating Partner:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.json(partners);
  } catch (error) {
    console.error("Error fetching partners:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const partnerId = req.params.id;
    const partner = await Partner.findById(partnerId);

    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    // Delete image file
    const imagePath = path.join(__dirname, "../uploads", partner.img);
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Error deleting image:", err);
    });

    await Partner.findByIdAndDelete(partnerId);
    res.json({ success: true, message: "Partner deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
