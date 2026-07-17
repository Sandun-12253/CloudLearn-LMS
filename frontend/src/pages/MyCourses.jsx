import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";


function MyCourses(){

    const [courses,setCourses] = useState([]);

    const navigate = useNavigate();



    useEffect(()=>{

        loadMyCourses();

    },[]);



    const loadMyCourses = async()=>{


        try{


            const response = await API.get("/enrollments/my");


            setCourses(response.data);



        }
        catch(error){


            console.log(error);


        }


    };




    return(

        <div>


            <h1 className="text-4xl font-bold mb-8">

                My Courses

            </h1>



            <div className="grid md:grid-cols-3 gap-8">


                {

                    courses.length === 0 ?


                    (

                        <p>

                            No enrolled courses

                        </p>

                    )


                    :

                    courses.map((item)=>(


                        <div

                            key={item.id}

                            className="bg-white shadow rounded-xl p-6"

                        >


                            <h2 className="text-2xl font-bold">

                                {item.courses.title}

                            </h2>



                            <p className="mt-3 text-gray-600">

                                {item.courses.description}

                            </p>




                            <button

                                onClick={()=>navigate(`/course/${item.course_id}`)}

                                className="mt-5 bg-blue-600 text-white px-5 py-2 rounded"

                            >

                                Continue Learning

                            </button>



                        </div>


                    ))

                }


            </div>


        </div>


    );

}


export default MyCourses;