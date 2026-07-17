const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");

const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");



// =================================
// CREATE LESSON
// =================================

router.post(
"/",
auth,
roleCheck("instructor","admin"),
async(req,res)=>{


    try{


        const {

            course_id,
            title,
            video_url,
            content

        } = req.body;



        const {data,error}=await supabase

            .from("lessons")

            .insert([

                {

                    course_id,

                    title,

                    video_url,

                    content

                }

            ])

            .select();



        if(error){

            return res.status(500).json({

                message:"Lesson creation failed",

                error:error.message

            });

        }



        res.status(201).json({

            message:"Lesson created successfully",

            lesson:data

        });



    }
    catch(err){


        res.status(500).json({

            message:"Server Error",

            error:err.message

        });


    }


});





// =================================
// GET ALL LESSONS
// =================================

router.get("/",async(req,res)=>{


    try{


        const {data,error}=await supabase

            .from("lessons")

            .select("*");



        if(error){

            return res.status(500).json({

                error:error.message

            });

        }



        res.json(data);



    }
    catch(err){


        res.status(500).json({

            error:err.message

        });


    }


});





// =================================
// GET LESSONS BY COURSE
// =================================

router.get("/course/:course_id",async(req,res)=>{


    try{


        const {course_id}=req.params;



        const {data,error}=await supabase

            .from("lessons")

            .select("*")

            .eq("course_id",course_id);



        if(error){

            return res.status(500).json({

                error:error.message

            });

        }



        res.json(data);



    }
    catch(err){


        res.status(500).json({

            error:err.message

        });


    }


});





// =================================
// UPDATE LESSON
// =================================

router.put(
"/:id",
auth,
roleCheck("instructor","admin"),
async(req,res)=>{


    try{


        const {id}=req.params;


        const {

            title,
            video_url,
            content

        }=req.body;



        const {data,error}=await supabase

            .from("lessons")

            .update({

                title,

                video_url,

                content

            })

            .eq("id",id)

            .select();



        if(error){

            return res.status(500).json({

                error:error.message

            });

        }



        res.json({

            message:"Lesson updated successfully",

            lesson:data

        });



    }
    catch(err){


        res.status(500).json({

            error:err.message

        });


    }


});






// =================================
// DELETE LESSON
// =================================

router.delete(
"/:id",
auth,
roleCheck("instructor","admin"),
async(req,res)=>{


    try{


        const {id}=req.params;



        const {error}=await supabase

            .from("lessons")

            .delete()

            .eq("id",id);



        if(error){

            return res.status(500).json({

                error:error.message

            });

        }



        res.json({

            message:"Lesson deleted successfully"

        });



    }
    catch(err){


        res.status(500).json({

            error:err.message

        });


    }


});





module.exports = router;