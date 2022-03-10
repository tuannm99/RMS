const multer = require('multer');
const fs = require('fs');
const path = require('path');

if (!fs.existsSync('uploads/')) {
  fs.mkdirSync('uploads/');
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
});

module.exports = { upload };
