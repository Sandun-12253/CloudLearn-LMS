import { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import API from "../api/axios";


function EditCourse(){

    const {id}=useParams();

    const navigate=useNavigate();


    const [course,setCourse]=useState({

        title:"",
        description:"",
        category:""

    });



    useEffect(()=>{

        loadCourse();

    },[]);



    const loadCourse=async()=>{

        try{

            const res=await API.get(`/courses/${id}`);

            setCourse(res.data);

        }
        catch(err){

            console.log(err);

        }

    };



    const handleChange=(e)=>{

        setCourse({

            ...course,
            [e.target.name]:e.target.value

        });

    };



    const updateCourse=async(e)=>{

        e.preventDefault();


        try{

            await API.put(`/courses/${id}`,course);


            alert("Course Updated");


            navigate("/courses");


        }
        catch(err){

            console.log(err);

        }


    };



    return(

        <div className="max-w-xl bg-white p-8 rounded-xl shadow">


            <h1 className="text-3xl font-bold mb-6">

                Edit Course

            </h1>



            <form onSubmit={updateCourse}>


                <input

                    name="title"

                    value={course.title}

                    onChange={handleChange}

                    className="w-full border p-3 mb-4 rounded"

                />



                <textarea

                    name="description"

                    value={course.description}

                    onChange={handleChange}

                    className="w-full border p-3 mb-4 rounded"

                />



                <input

                    name="category"

                    value={course.category}

                    onChange={handleChange}

                    className="w-full border p-3 mb-4 rounded"

                />



                <button

                    className="bg-green-600 text-white px-6 py-3 rounded"

                >

                    Update

                </button>



            </form>


        </div>

    );

}


export default EditCourse;