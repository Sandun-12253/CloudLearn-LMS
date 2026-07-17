import { useEffect, useState } from "react";
import API from "../api/axios";

function Quizzes() {

    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {

        loadQuizzes();

    }, []);

    const loadQuizzes = async () => {

        try {

            const res = await API.get("/quizzes");

            setQuizzes(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const deleteQuiz = async (id) => {

        if (!window.confirm("Delete this question?")) return;

        try {

            await API.delete(`/quizzes/${id}`);

            alert("Question Deleted");

            loadQuizzes();

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div>

            <h1 className="text-4xl font-bold mb-8">

                Quiz Questions

            </h1>

            <div className="space-y-6">

                {

                    quizzes.map((quiz) => (

                        <div
                            key={quiz.id}
                            className="bg-white shadow rounded-xl p-6"
                        >

                            <h2 className="font-bold text-xl">

                                {quiz.question}

                            </h2>

                            <div className="mt-4 space-y-2">

                                <p>A. {quiz.option_a}</p>

                                <p>B. {quiz.option_b}</p>

                                <p>C. {quiz.option_c}</p>

                                <p>D. {quiz.option_d}</p>

                            </div>

                            <p className="mt-4 text-green-600 font-semibold">

                                Correct Answer : {quiz.correct_answer}

                            </p>

                            <button

                                onClick={() => deleteQuiz(quiz.id)}

                                className="mt-5 bg-red-600 text-white px-5 py-2 rounded"

                            >

                                Delete

                            </button>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default Quizzes;