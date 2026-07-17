import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";


function TakeQuiz(){


    const { course_id } = useParams();


    const [quizzes,setQuizzes] = useState([]);

    const [answers,setAnswers] = useState({});

    const [score,setScore] = useState(null);







    useEffect(()=>{

        loadQuiz();

    },[]);







    const loadQuiz = async()=>{


        try{


            const res = await API.get(
                `/quizzes/course/${course_id}`
            );


            setQuizzes(res.data);



        }
        catch(error){


            console.log(error);


        }


    };








    const selectAnswer = (quizId,value)=>{


        setAnswers({

            ...answers,

            [quizId]:value

        });


    };









    const submitQuiz = async()=>{


        let totalScore = 0;



        quizzes.forEach((quiz)=>{


            if(

                answers[quiz.id] === quiz.correct_answer

            ){

                totalScore++;

            }


        });





        setScore(totalScore);







        try{


            const response = await API.post(

                "/results",

                {

                    quiz_id: quizzes[0].id,

                    score: totalScore

                }

            );



            console.log(response.data);


            alert("Quiz submitted successfully");



        }
        catch(error){


            console.log(
                error.response?.data || error
            );


        }



    };









    return(


        <div className="bg-white p-8 rounded-xl shadow">



            <h1 className="text-3xl font-bold mb-8">

                Course Quiz

            </h1>







            {
                quizzes.length === 0 &&

                <p>

                    No quiz questions available

                </p>

            }








            {


                quizzes.map((quiz,index)=>(



                    <div

                        key={quiz.id}

                        className="mb-8 border-b pb-5"

                    >




                        <h2 className="font-bold text-xl">

                            {index + 1}. {quiz.question}

                        </h2>







                        <div className="mt-4 space-y-2">





                            <label className="block">


                                <input

                                    type="radio"

                                    name={quiz.id}

                                    onChange={()=>selectAnswer(
                                        quiz.id,
                                        quiz.option_a
                                    )}

                                />

                                {" "} A. {quiz.option_a}


                            </label>









                            <label className="block">


                                <input

                                    type="radio"

                                    name={quiz.id}

                                    onChange={()=>selectAnswer(
                                        quiz.id,
                                        quiz.option_b
                                    )}

                                />

                                {" "} B. {quiz.option_b}


                            </label>









                            <label className="block">


                                <input

                                    type="radio"

                                    name={quiz.id}

                                    onChange={()=>selectAnswer(
                                        quiz.id,
                                        quiz.option_c
                                    )}

                                />

                                {" "} C. {quiz.option_c}


                            </label>









                            <label className="block">


                                <input

                                    type="radio"

                                    name={quiz.id}

                                    onChange={()=>selectAnswer(
                                        quiz.id,
                                        quiz.option_d
                                    )}

                                />

                                {" "} D. {quiz.option_d}


                            </label>






                        </div>





                    </div>



                ))


            }









            {

                quizzes.length > 0 &&


                <button


                    onClick={submitQuiz}


                    className="bg-blue-600 text-white px-6 py-3 rounded-lg"


                >

                    Submit Quiz


                </button>


            }









            {

                score !== null &&


                <h2 className="mt-6 text-2xl font-bold">

                    Your Score : {score} / {quizzes.length}

                </h2>


            }






        </div>


    );


}


export default TakeQuiz;