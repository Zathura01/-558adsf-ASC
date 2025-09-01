const multer = require('multer')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')


const imgPath = path.join(__dirname,'../uploads/images')
const vidPath = path.join(__dirname,'../uploads/videos')

if(!fs.existsSync(imgPath)){
   fs.mkdirSync(imgPath)
}
if(!fs.existsSync(vidPath)){
    fs.mkdirSync(vidPath)
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.mimetype.startsWith('image')){
            cb(null, imgPath)
        }else if(file.mimetype.startsWith('video')){
            cb(null, vidPath)
        }
    },
    filename: function(req, file, cb){
       cb(null, Date.now()+file.originalname)
    }
})


const uploads = multer({storage})

module.exports = uploads