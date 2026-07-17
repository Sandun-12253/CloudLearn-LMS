import { useEffect, useState } from "react";
import API from "../api/axios";


function Results(){


    const [results,setResults] = useState([]);


    const user = JSON.parse(
        localStorage.getItem("user")
    );





    useEffect(()=>{


        loadResults();


    },[]);







    const loadResults = async()=>{


        try{


            const res = await API.get(
                `/results/user/${user.id}`
            );


            setResults(res.data);



        }
        catch(error){


            console.log(error);


        }


    };









    return(


        <div>


            <h1 className="text-4xl font-bold mb-8">

                My Results

            </h1>






            <div className="space-y-6">





            {


                results.length === 0 ?


                (

                    <div className="bg-white p-8 rounded-xl shadow">

                        <p>

                            No results available

                        </p>

                    </div>

                )


                :


                results.map((result)=>(


                    <div

                        key={result.id}

                        className="bg-white p-6 rounded-xl shadow"

                    >



                        <h2 className="text-xl font-bold">

                            Quiz ID:

                            {" "}

                            {result.quiz_id}

                        </h2>






                        <p className="mt-3">

                            Score:

                            {" "}

                            {result.score}

                        </p>






                        <p className="mt-3">

                            Completed Date:

                            {" "}

                            {

                                new Date(
                                    result.completed_date
                                ).toLocaleDateString()

                            }

                        </p>







                        <p

                        className={

                            result.score >= 3

                            ?

                            "text-green-600 font-bold mt-3"

                            :

                            "text-red-600 font-bold mt-3"

                        }

                        >


                            {

                                result.score >= 3

                                ?

                                "Passed"

                                :

                                "Failed"

                            }


                        </p>





                    </div>


                ))


            }





            </div>





        </div>


    );


}



export default Results;