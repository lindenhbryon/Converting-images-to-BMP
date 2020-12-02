const fs = require('fs');
var buffer = new Buffer.alloc(1024); 
var Jimp = require('jimp');
class ImageHelper {
    constructor(){
        this.file = null;
        this.bmpFile = null;
        this.twodiarray = null;
    }
    convertImageToBMP(){
        console.log("inside convert");
        this.bmpFile = 'newfile-'+Date.now()+'.bmp';
        return new Promise((resolve, reject) => {
            Jimp.read('./public/uploads/' + this.file)
            .then(lenna => {
                lenna
                .resize(256, 256) // resize
                .quality(60) // set JPEG quality
                .write('./public/uploads/' + this.bmpFile); // save
                resolve();
            })
            .catch(err => {
                reject(err);
            });
        });
    }   
    setImage(){
        this.file = fileName;
        this.convertImageToBMP(file).then(function(){
            console.log("bmp done");
        }).catch(function(err){
            console.log("err", err);
        })
    }
}
exports.ImageHelper = ImageHelper