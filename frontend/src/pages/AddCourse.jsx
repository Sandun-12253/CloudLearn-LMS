import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";


function AddCourse(){


    const navigate = useNavigate();


    const [formData,setFormData] = useState({

        title:"",
        description:"",
        image_url:""

    });



    const handleChange=(e)=>{

        setFormData({

            ...formData,
            [e.target.name]:e.target.value

        });

    };



    const submitCourse=async(e)=>{

        e.preventDefault();


        try{


            await API.post("/courses",formData);


            alert("Course Created Successfully");


            navigate("/courses");


        }
        catch(error){


            console.log(error.response?.data || error);


            alert(error.response?.data?.error || error.response?.data?.message || "Course Creation Failed");


        }


    };



    return(


        <div className="max-w-xl bg-white p-8 rounded-xl shadow">


            <h1 className="text-3xl font-bold mb-6">

                Add New Course

            </h1>



            <form onSubmit={submitCourse}>


                <input

                    name="title"

                    placeholder="Course Title"

                    onChange={handleChange}

                    className="w-full border p-3 rounded mb-4"

                    required

                />



                <textarea

                    name="description"

                    placeholder="Course Description"

                    onChange={handleChange}

                    className="w-full border p-3 rounded mb-4"

                    rows="5"

                    required

                />



                <input

                    name="image_url"

                    placeholder="Course Image URL"

                    onChange={handleChange}

                    className="w-full border p-3 rounded mb-4"

                />



                <button

                    className="bg-blue-600 text-white px-6 py-3 rounded-lg"

                >

                    Create Course

                </button>



            </form>



        </div>


    );

}


export default AddCourse;