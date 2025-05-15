/**
 * File: /middleware/upload.js
 * Purpose: Multer configuration for handling image uploads.
 * Notes:
 * - Saves uploads to /public/uploads folder.
 * - Filenames are timestamped + original extension for uniqueness.
 */

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'uploads'));
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g. 1657890123456.jpg
  }
});

// Filter to accept only images (optional)
function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Only images are allowed'));
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;
