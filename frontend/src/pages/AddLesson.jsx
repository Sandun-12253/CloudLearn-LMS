import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";


function AddLesson(){

    const navigate = useNavigate();


    const [lesson,setLesson] = useState({

        course_id:"",
        title:"",
        video_url:"",
        content:""

    });



    const handleChange=(e)=>{

        setLesson({

            ...lesson,
            [e.target.name]:e.target.value

        });

    };



    const createLesson=async(e)=>{

        e.preventDefault();


        try{


            await API.post("/lessons", lesson);


            alert("Lesson Created Successfully");


            navigate("/lessons");


        }
        catch(error){

            console.log(error.response?.data || error);

            alert("Lesson Creation Failed");

        }


    };



    return(

        <div className="max-w-xl bg-white p-8 rounded-xl shadow">


            <h1 className="text-3xl font-bold mb-6">

                Add New Lesson

            </h1>



            <form onSubmit={createLesson}>


                <input

                    name="course_id"

                    placeholder="Course ID"

                    onChange={handleChange}

                    className="w-full border p-3 rounded mb-4"

                    required

                />



                <input

                    name="title"

                    placeholder="Lesson Title"

                    onChange={handleChange}

                    className="w-full border p-3 rounded mb-4"

                    required

                />



                <input

                    name="video_url"

                    placeholder="Video URL"

                    onChange={handleChange}

                    className="w-full border p-3 rounded mb-4"

                />



                <textarea

                    name="content"

                    placeholder="Lesson Description"

                    onChange={handleChange}

                    className="w-full border p-3 rounded mb-4"

                    rows="5"

                />



                <button

                    className="bg-blue-600 text-white px-6 py-3 rounded-lg"

                >

                    Create Lesson

                </button>



            </form>


        </div>

    );

}


export default AddLesson;