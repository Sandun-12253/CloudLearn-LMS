import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";


function CourseDetails(){


    const {id} = useParams();

    const navigate = useNavigate();


    const [course,setCourse] = useState(null);

    const [lessons,setLessons] = useState([]);




    useEffect(()=>{


        loadCourse();

        loadLessons();


    },[]);






    const loadCourse = async()=>{


        try{


            const res = await API.get(
                `/courses/${id}`
            );


            setCourse(res.data);



        }
        catch(error){


            console.log(error);


        }


    };







    const loadLessons = async()=>{


        try{


            const res = await API.get(
                `/lessons/course/${id}`
            );


            setLessons(res.data);



        }
        catch(error){


            console.log(error);


        }


    };









    if(!course){


        return <h1>Loading...</h1>;


    }









    return(


        <div className="space-y-8">



            <div className="bg-white p-8 rounded-xl shadow">


                <h1 className="text-4xl font-bold">

                    {course.title}

                </h1>



                <p className="mt-5 text-gray-600">

                    {course.description}

                </p>



                <p className="mt-4">

                    Category:
                    {" "}
                    {course.category}

                </p>




            </div>









            <div className="bg-white p-8 rounded-xl shadow">


                <h2 className="text-3xl font-bold mb-5">

                    Lessons

                </h2>





                {


                    lessons.length === 0 ?

                    <p>
                        No lessons available
                    </p>


                    :


                    lessons.map((lesson)=>(


                        <div

                            key={lesson.id}

                            className="border p-5 rounded mb-4"

                        >


                            <h3 className="text-xl font-bold">

                                {lesson.title}

                            </h3>



                            <p className="text-gray-600 mt-2">

                                {lesson.description}

                            </p>


                        </div>


                    ))


                }




            </div>









            <div className="bg-white p-8 rounded-xl shadow">


                <h2 className="text-3xl font-bold mb-5">

                    Course Quiz

                </h2>




                <button

                    onClick={()=>navigate(`/take-quiz/${id}`)}

                    className="bg-blue-600 text-white px-6 py-3 rounded-lg"

                >

                    Take Quiz

                </button>




            </div>






        </div>


    );


}



export default CourseDetails;