const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");

const auth = require("../middleware/auth");



// =================================
// SAVE QUIZ RESULT
// =================================

router.post(
"/",
auth,
async(req,res)=>{


    try{


        const {

            user_id,
            quiz_id,
            score

        } = req.body;



        const {data,error}=await supabase

            .from("results")

            .insert([

                {

                    user_id,

                    quiz_id,

                    score,

                    completed_date:new Date()

                }

            ])

            .select();




        if(error){


            return res.status(500).json({

                message:"Result save failed",

                error:error.message

            });


        }




        res.status(201).json({

            message:"Result saved successfully",

            result:data

        });



    }
    catch(err){


        res.status(500).json({

            error:err.message

        });


    }


});







// =================================
// GET ALL RESULTS
// =================================

router.get("/",async(req,res)=>{


    try{


        const {data,error}=await supabase

            .from("results")

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
// GET RESULTS BY USER
// =================================

router.get(
"/user/:user_id",
async(req,res)=>{


    try{


        const {user_id}=req.params;



        const {data,error}=await supabase

            .from("results")

            .select("*")

            .eq("user_id",user_id);




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







module.exports = router;