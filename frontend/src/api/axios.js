import axios from "axios";


const API = axios.create({

    baseURL:"http://16.16.253.236:5000"

});



// Add JWT Token automatically

API.interceptors.request.use(

    (config)=>{


        const token = localStorage.getItem("token");


        if(token){

            config.headers.Authorization = `Bearer ${token}`;

        }


        return config;


    },


    (error)=>{

        return Promise.reject(error);

    }

);



export default API;