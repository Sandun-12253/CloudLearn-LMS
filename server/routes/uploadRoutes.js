const express = require("express");
const router = express.Router();

const multer = require("multer");
const multerS3 = require("multer-s3");

const { PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = require("../config/s3");


// Multer configuration

const upload = multer({

    storage: multerS3({

        s3: s3,

        bucket: process.env.AWS_BUCKET_NAME,

        contentType: multerS3.AUTO_CONTENT_TYPE,


        key: function(req, file, cb){


            const fileName =
            Date.now() + "-" + file.originalname;


            cb(null, fileName);


        }


    })


});




// ==========================
// UPLOAD FILE
// ==========================

router.post(
"/",
upload.single("file"),
async(req,res)=>{


    try{


        if(!req.file){

            return res.status(400).json({

                message:"No file uploaded"

            });

        }



        res.json({

            message:"File uploaded successfully",

            file:{
                name:req.file.originalname,
                url:req.file.location
            }

        });



    }
    catch(err){


        res.status(500).json({

            message:"Upload failed",

            error:err.message

        });


    }


});




module.exports = router;