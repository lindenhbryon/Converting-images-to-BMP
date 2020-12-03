const fs = require('fs');
var buffer = new Buffer.alloc(1024); 
var Jimp = require('jimp');
const { resolve } = require('path');
const { rejects } = require('assert');
class ImageHelper {
    constructor(){
        this.file = null;
        this.bmpFile = null;
        this.twodiarray = null;
    }
    convertImageToBMP = () =>{
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
                    console.log(err);
                });
        });
    }   
    setImage = (fileName) => {
        this.file = fileName;
        this.bmpFile = 'newfile-'+Date.now()+'.bmp';
        this.convertImageToBMP().then(() => {
            console.log("created bmp");
        });
    }
}
exports.ImageHelper = ImageHelper