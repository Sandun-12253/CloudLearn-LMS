import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";


function Courses(){

    const [courses,setCourses] = useState([]);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));



    useEffect(()=>{

        loadCourses();

    },[]);



    const loadCourses = async()=>{

        try{

            const response = await API.get("/courses");

            setCourses(response.data);

        }
        catch(error){

            console.log(error);

        }

    };





    const enrollCourse = async(course_id)=>{


        try{


            await API.post("/enrollments",{

                course_id

            });


            alert("Course Enrolled Successfully");


        }
        catch(error){


            alert(
                error.response?.data?.message ||
                "Enrollment Failed"
            );


        }


    };





    const deleteCourse = async(id)=>{


        const confirmDelete = window.confirm(
            "Delete this course?"
        );


        if(!confirmDelete) return;



        try{

            await API.delete(`/courses/${id}`);


            alert("Course Deleted");


            loadCourses();


        }
        catch(error){

            console.log(error);

        }

    };





    return(

        <div>


            <div className="flex justify-between items-center mb-8">


                <h1 className="text-4xl font-bold">

                    Courses

                </h1>



                {
                    user?.role === "instructor" &&

                    <button

                        onClick={()=>navigate("/add-course")}

                        className="bg-blue-600 text-white px-6 py-3 rounded-lg"

                    >

                        + Add Course

                    </button>

                }


            </div>





            <div className="grid md:grid-cols-3 gap-8">


            {

                courses.map((course)=>(


                    <div

                        key={course.id}

                        className="bg-white rounded-xl shadow-lg p-6"

                    >



                        <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center text-5xl">

                            📚

                        </div>




                        <h2 className="text-2xl font-bold mt-5">

                            {course.title}

                        </h2>




                        <p className="text-gray-600 mt-3">

                            {course.description}

                        </p>




                        <button

                            onClick={()=>navigate(`/course/${course.id}`)}

                            className="mt-5 bg-green-600 text-white px-4 py-2 rounded"

                        >

                            View

                        </button>




                        {
                            user?.role === "student" &&

                            <button

                                onClick={()=>enrollCourse(course.id)}

                                className="mt-4 ml-3 bg-blue-600 text-white px-4 py-2 rounded"

                            >

                                Enroll

                            </button>

                        }





                        {

                        user?.role==="instructor" &&


                        <div className="mt-4 flex gap-3">


                            <button

                                onClick={()=>navigate(`/edit-course/${course.id}`)}

                                className="bg-yellow-500 text-white px-4 py-2 rounded"

                            >

                                Edit

                            </button>




                            <button

                                onClick={()=>deleteCourse(course.id)}

                                className="bg-red-600 text-white px-4 py-2 rounded"

                            >

                                Delete

                            </button>


                        </div>


                        }


                    </div>


                ))

            }


            </div>


        </div>

    );

}


export default Courses;