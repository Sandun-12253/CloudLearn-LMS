import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";


function AddQuiz(){


    const navigate = useNavigate();



    const [formData,setFormData] = useState({

        course_id:"",
        question:"",
        option_a:"",
        option_b:"",
        option_c:"",
        option_d:"",
        correct_answer:""

    });






    const handleChange=(e)=>{


        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });


    };







    const submitQuiz=async(e)=>{


        e.preventDefault();



        try{


            await API.post(

                "/quizzes",

                formData

            );



            alert("Quiz created successfully");



            navigate("/quizzes");



        }
        catch(error){


            console.log(
                error.response?.data || error
            );


            alert("Quiz creation failed");


        }



    };








    return(


        <div className="bg-white p-8 rounded-xl shadow max-w-3xl">


            <h1 className="text-3xl font-bold mb-8">

                Add Quiz Question

            </h1>






            <form

                onSubmit={submitQuiz}

                className="space-y-5"

            >







                <input

                    type="text"

                    name="course_id"

                    placeholder="Course ID"

                    value={formData.course_id}

                    onChange={handleChange}

                    className="border p-3 rounded w-full"

                    required

                />








                <input

                    type="text"

                    name="question"

                    placeholder="Question"

                    value={formData.question}

                    onChange={handleChange}

                    className="border p-3 rounded w-full"

                    required

                />








                <input

                    type="text"

                    name="option_a"

                    placeholder="Option A"

                    value={formData.option_a}

                    onChange={handleChange}

                    className="border p-3 rounded w-full"

                    required

                />









                <input

                    type="text"

                    name="option_b"

                    placeholder="Option B"

                    value={formData.option_b}

                    onChange={handleChange}

                    className="border p-3 rounded w-full"

                    required

                />









                <input

                    type="text"

                    name="option_c"

                    placeholder="Option C"

                    value={formData.option_c}

                    onChange={handleChange}

                    className="border p-3 rounded w-full"

                    required

                />









                <input

                    type="text"

                    name="option_d"

                    placeholder="Option D"

                    value={formData.option_d}

                    onChange={handleChange}

                    className="border p-3 rounded w-full"

                    required

                />









                <select

                    name="correct_answer"

                    value={formData.correct_answer}

                    onChange={handleChange}

                    className="border p-3 rounded w-full"

                    required

                >



                    <option value="">

                        Select Correct Answer

                    </option>




                    {

                        formData.option_a &&

                        <option value={formData.option_a}>

                            A. {formData.option_a}

                        </option>

                    }






                    {

                        formData.option_b &&

                        <option value={formData.option_b}>

                            B. {formData.option_b}

                        </option>

                    }






                    {

                        formData.option_c &&

                        <option value={formData.option_c}>

                            C. {formData.option_c}

                        </option>

                    }






                    {

                        formData.option_d &&

                        <option value={formData.option_d}>

                            D. {formData.option_d}

                        </option>

                    }



                </select>









                <button

                    type="submit"

                    className="bg-blue-600 text-white px-6 py-3 rounded-lg"

                >

                    Add Quiz

                </button>






            </form>





        </div>


    );


}


export default AddQuiz;