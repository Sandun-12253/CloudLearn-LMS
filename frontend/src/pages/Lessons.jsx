import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";


function Lessons(){


    const [lessons,setLessons] = useState([]);



    useEffect(()=>{

        getLessons();

    },[]);




    const getLessons = async()=>{


        try{


            const response = await API.get("/lessons");


            setLessons(response.data);



        }
        catch(error){


            console.log(error);


        }


    };





    return(


        <div className="p-6">


            <div className="flex justify-between items-center mb-6">


                <h1 className="text-3xl font-bold">

                    Lessons

                </h1>



                <Link

                    to="/add-lesson"

                    className="bg-blue-600 text-white px-5 py-2 rounded"

                >

                    Add Lesson

                </Link>



            </div>





            {

                lessons.length === 0 ?


                (

                    <p>

                        No lessons available

                    </p>

                )


                :


                (


                    <div className="grid md:grid-cols-3 gap-6">


                        {

                            lessons.map((lesson)=>(


                                <div

                                    key={lesson.id}

                                    className="bg-white shadow rounded-xl p-5"


                                >



                                    <h2 className="text-xl font-bold mb-3">

                                        {lesson.title}

                                    </h2>



                                    <p className="mb-3">

                                        {lesson.content}

                                    </p>




                                    <p className="text-sm text-gray-500 mb-4">

                                        Course ID:

                                        <br />

                                        {lesson.course_id}

                                    </p>




                                    {

                                        lesson.video_url &&


                                        <a

                                            href={lesson.video_url}

                                            target="_blank"

                                            className="text-blue-600"

                                        >

                                            Watch Video

                                        </a>


                                    }



                                </div>



                            ))

                        }


                    </div>


                )


            }



        </div>


    );


}


export default Lessons;