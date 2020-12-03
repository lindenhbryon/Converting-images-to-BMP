const fs = require('fs');
var Jimp = require('jimp');
class ImageHelper {
    constructor(){
        this.file = null;
        this.bmpFile = null;
    }
    convertImageToBMP = (cb) =>{
        Jimp.read('./public/uploads/' + this.file)
            .then(lenna => {
                lenna
                .resize(256, 256) // resize
                .quality(60) // set JPEG quality
                .write('./public/uploads/' + this.bmpFile, cb); // save
            })
            .catch(err => {
                console.log(err);
            });
      
    }   
    initiateConversion = (fileName) => {
        this.file = fileName;
        this.bmpFile = 'newfile-'+Date.now()+'.bmp';
        this.convertImageToBMP((test) => {
            return true;
        });
        
    }
}
exports.ImageHelper = ImageHelper