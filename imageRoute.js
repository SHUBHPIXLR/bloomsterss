const express = require('express');
const router = express.Router();
const extractFile = require("./utils/file");
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


router.post("/upload", extractFile.single("image"), async(req,res, next) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'images' , use_filename :true});

        return res.json({
          status: true,
          message: "Upload was successful",
          data: {
            public_id: result.public_id,
            url: result.secure_url,
          },
        });
      } catch (error) {

        next(error.message);
        res.json({
          status: false,
          message: "Image upload Unsuccessfull",
          data: null
        });
      }
});
    
module.exports = router;