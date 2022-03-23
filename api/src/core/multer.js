const multer = require('multer');
const fs = require('fs');
const path = require('path');

if (!fs.existsSync('uploads/')) {
  fs.mkdirSync('uploads/');
}
const uploadImg = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.mimetype)) {
      return cb(new Error('file is not allowed'));
    }
    cb(null, true);
  },
});

const uploadFile = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      ![
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats',
        'officedocument.wordprocessingml.document',
      ].includes(file.mimetype)
    ) {
      return cb(new Error('file is not allowed, only support: .pdf, .doc'));
    }
    cb(null, true);
  },
});

module.exports = { uploadFile, uploadImg };
