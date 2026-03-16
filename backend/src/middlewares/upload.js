const multer = require('multer');
const path = require('path');

// Storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// File filter (only images)
const fileFilter = (req, file, cb) => {

  const allowedTypes = /jpeg|jpg|png|webp/;

  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Only image files are allowed");
  }
};

// Upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;