const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "c2i_uploads", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "mp4", "mov", "avi", "mkv", "webm"],
    resource_type: "auto", // Automatically detect image or video
  },
});

const upload = multer({ storage });

module.exports = upload;
