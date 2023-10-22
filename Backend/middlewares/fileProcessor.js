const multer = require("multer");
const path = require("path");

// Define storage and file naming
const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "uploads"), // Set your desired upload directory
  filename: (req, file, cb) => {
    const ext = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + ext);
  },
});

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 10 MB limit
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /pdf|doc|docx/;
    const ext = path.extname(file.originalname).toLowerCase();
    const isAllowed = allowedFileTypes.test(ext);
    if (isAllowed) {
      return cb(null, true);
    } else {
      return cb(new Error('Invalid file type. Only PDF, DOC, DOCX files are allowed.'));
    }
  }
});

module.exports = upload;
