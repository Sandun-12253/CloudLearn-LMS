const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");
const auth = require("../middleware/auth");



// ==========================
// ENROLL STUDENT
// ==========================

router.post("/", auth, async (req, res) => {

    try {

        const { course_id } = req.body;

        const user_id = req.user.id;



        // Already enrolled?

        const { data: existing } = await supabase

            .from("enrollments")

            .select("*")

            .eq("user_id", user_id)

            .eq("course_id", course_id);



        if (existing && existing.length > 0) {

            return res.status(400).json({

                message: "Already enrolled"

            });

        }



        const { data, error } = await supabase

            .from("enrollments")

            .insert([

                {

                    user_id,

                    course_id

                }

            ])

            .select();



        if (error) {

            return res.status(500).json({

                message: "Enrollment failed",

                error: error.message

            });

        }



        res.status(201).json({

            message: "Student enrolled successfully",

            enrollment: data

        });

    }

    catch (err) {

        res.status(500).json({

            error: err.message

        });

    }

});





// ==========================
// MY ENROLLMENTS
// ==========================

router.get("/my", auth, async (req, res) => {

    try {

        const user_id = req.user.id;



        const { data, error } = await supabase

            .from("enrollments")

            .select("*, courses(*)")

            .eq("user_id", user_id);



        if (error) {

            return res.status(500).json({

                error: error.message

            });

        }



        res.json(data);

    }

    catch (err) {

        res.status(500).json({

            error: err.message

        });

    }

});





// ==========================
// ALL ENROLLMENTS
// ==========================

router.get("/", auth, async (req, res) => {

    try {

        const { data, error } = await supabase

            .from("enrollments")

            .select("*");



        if (error) {

            return res.status(500).json({

                error: error.message

            });

        }



        res.json(data);

    }

    catch (err) {

        res.status(500).json({

            error: err.message

        });

    }

});





module.exports = router;