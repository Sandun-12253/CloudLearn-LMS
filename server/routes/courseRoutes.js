const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");

const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");



// ==========================
// CREATE COURSE
// Instructor/Admin only
// ==========================

router.post(
"/",
auth,
roleCheck("instructor","admin"),
async(req,res)=>{


    try{


        const {

            title,
            description,
            image_url

        } = req.body;



        const instructor_id = req.user.id;



        const {data,error}=await supabase

            .from("courses")

            .insert([

                {

                    title,

                    description,

                    instructor_id,

                    image_url

                }

            ])

            .select();



        if(error){

            return res.status(500).json({

                message:"Course creation failed",

                error:error.message

            });

        }



        res.status(201).json({

            message:"Course created successfully",

            course:data

        });



    }
    catch(err){


        res.status(500).json({

            message:"Server Error",

            error:err.message

        });


    }


});






// ==========================
// GET ALL COURSES
// ==========================

router.get("/",async(req,res)=>{


    try{


        const {data,error}=await supabase

            .from("courses")

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






// ==========================
// GET SINGLE COURSE
// ==========================

router.get("/:id",async(req,res)=>{


    try{


        const {id}=req.params;



        const {data,error}=await supabase

            .from("courses")

            .select("*")

            .eq("id",id)

            .single();



        if(error){

            return res.status(404).json({

                message:"Course not found"

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





// ==========================
// DELETE COURSE
// Instructor/Admin only
// ==========================

router.delete(
"/:id",
auth,
roleCheck("instructor","admin"),
async(req,res)=>{


    try{


        const {id}=req.params;



        const {error}=await supabase

            .from("courses")

            .delete()

            .eq("id",id);



        if(error){

            return res.status(500).json({

                message:"Delete failed",

                error:error.message

            });

        }



        res.json({

            message:"Course deleted successfully"

        });



    }
    catch(err){


        res.status(500).json({

            error:err.message

        });


    }


});





// ==========================
// UPDATE COURSE
// ==========================

router.put(
"/:id",
auth,
roleCheck("instructor","admin"),
async(req,res)=>{


    try{


        const {id}=req.params;


        const {

            title,
            description,
            image_url

        }=req.body;



        const {data,error}=await supabase

            .from("courses")

            .update({

                title,

                description,

                image_url

            })

            .eq("id",id)

            .select();



        if(error){

            return res.status(500).json({

                message:"Update failed",

                error:error.message

            });

        }



        res.json({

            message:"Course updated successfully",

            course:data

        });



    }
    catch(err){


        res.status(500).json({

            error:err.message

        });


    }


});





module.exports = router;