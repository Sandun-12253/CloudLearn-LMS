const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");

const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");




// ==========================
// CREATE QUIZ
// ==========================

router.post(
"/",
auth,
roleCheck("instructor","admin"),
async(req,res)=>{


    try{


        const {

            course_id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer

        } = req.body;




        const {data,error}=await supabase

            .from("quizzes")

            .insert([{

                course_id,
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_answer

            }])

            .select();




        if(error){

            return res.status(500).json({

                message:"Quiz creation failed",

                error:error.message

            });

        }




        res.status(201).json({

            message:"Quiz created successfully",

            quiz:data

        });



    }
    catch(err){


        res.status(500).json({

            error:err.message

        });


    }


});








// ==========================
// GET ALL QUIZZES
// ==========================

router.get("/",async(req,res)=>{


    try{


        const {data,error}=await supabase

            .from("quizzes")

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
// GET QUIZZES BY COURSE
// ==========================

router.get("/course/:course_id",async(req,res)=>{


    try{


        const {course_id}=req.params;



        const {data,error}=await supabase

            .from("quizzes")

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









// ==========================
// GET SINGLE QUIZ
// ==========================

router.get("/:id",async(req,res)=>{


    try{


        const {id}=req.params;



        const {data,error}=await supabase

            .from("quizzes")

            .select("*")

            .eq("id",id)

            .single();



        if(error){

            return res.status(404).json({

                message:"Quiz not found"

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
// DELETE QUIZ
// ==========================

router.delete(
"/:id",
auth,
roleCheck("instructor","admin"),
async(req,res)=>{


    try{


        const {id}=req.params;



        // Delete related results first

        const {error:resultError}=await supabase

            .from("results")

            .delete()

            .eq("quiz_id",id);



        if(resultError){

            return res.status(500).json({

                message:"Related results delete failed",

                error:resultError.message

            });

        }






        // Delete quiz

        const {data,error}=await supabase

            .from("quizzes")

            .delete()

            .eq("id",id)

            .select();





        if(error){

            return res.status(500).json({

                message:"Quiz delete failed",

                error:error.message

            });

        }




        res.json({

            message:"Quiz deleted successfully",

            deleted:data

        });




    }
    catch(err){


        res.status(500).json({

            error:err.message

        });


    }


});









// ==========================
// SUBMIT QUIZ
// ==========================

router.post(
"/submit",
auth,
async(req,res)=>{


    try{


        const {

            quiz_id,
            answers

        } = req.body;



        const user_id=req.user.id;





        const {data:questions,error}=await supabase

            .from("quizzes")

            .select("*")

            .eq("id",quiz_id);





        if(error){

            return res.status(500).json({

                error:error.message

            });

        }





        let score=0;




        questions.forEach((quiz)=>{


            if(

                answers[quiz.id] === quiz.correct_answer

            ){

                score++;

            }


        });








        const {data:result,error:resultError}=await supabase

            .from("results")

            .insert([{

                user_id,

                quiz_id,

                score,

                completed_date:new Date()

            }])

            .select();






        if(resultError){

            return res.status(500).json({

                error:resultError.message

            });

        }






        res.json({

            message:"Quiz submitted successfully",

            score,

            result

        });




    }
    catch(err){


        res.status(500).json({

            error:err.message

        });


    }


});






module.exports = router;