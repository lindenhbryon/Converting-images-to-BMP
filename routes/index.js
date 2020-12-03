var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
var imageHelper = require('../helpers/ImageHelper');
var imageHelperInstance = new imageHelper.ImageHelper();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})
const imageFilter = function(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', (req, res) => {
  let upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic');

  upload(req, res, function(err) {
      var message = "File converted successfully";
      var error = false;
      if (req.fileValidationError) {
        message = "Only images can be uploaded jpg png";
        error = true;
      }
      else if (!req.file) {
          message = "Please select a file to upload";
          error = true;
      }
      else if (err instanceof multer.MulterError) {
        message = "Multer error";
        error = true;
      }
      else if (err) {
        message = "Unknown error";
        error = true;
      }
      imageHelperInstance.initiateConversion(req.file.filename)

      res.render('index', { title: 'Express', error: error, message:message });
      
  });
});

module.exports = router;
