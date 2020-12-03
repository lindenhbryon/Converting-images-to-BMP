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
 
var upload = multer({ storage: storage })

const imageFilter = function(file) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      return false;
  }
  return true;
};

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/upload', upload.single('profile_pic'), function (req, res, next) {
  imageHelperInstance.setImage(req.file.filename);
  
  // if(!req.file){
  //   var error = 'No File Uploaded'
  // }
  // //re-visit this later
  // if(!imageFilter(req.file.filename)){
  //   error = 'incorrect file format';
  // };

  


  // res.render('index', 
  //     { 
  //       title: 'Express',
  //       error: error
  //     }
  //   );
  
})
module.exports = router;
