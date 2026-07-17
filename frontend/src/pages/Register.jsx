import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: "",
        role: "student"

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value

        });

    };

    const register = async (e) => {

        e.preventDefault();

        try {

            await API.post("/users/register", formData);

            alert("Registration Successful");

            navigate("/");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Registration Failed"

            );

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-blue-100">

            <form

                onSubmit={register}

                className="bg-white p-8 rounded-xl shadow-lg w-96"

            >

                <h1 className="text-3xl font-bold mb-6 text-center">

                    Register

                </h1>

                <input

                    type="text"

                    name="name"

                    placeholder="Full Name"

                    onChange={handleChange}

                    className="w-full border p-3 rounded mb-4"

                    required

                />

                <input

                    type="email"

                    name="email"

                    placeholder="Email"

                    onChange={handleChange}

                    className="w-full border p-3 rounded mb-4"

                    required

                />

                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    onChange={handleChange}

                    className="w-full border p-3 rounded mb-4"

                    required

                />

                <select

                    name="role"

                    onChange={handleChange}

                    className="w-full border p-3 rounded mb-4"

                >

                    <option value="student">

                        Student

                    </option>

                    <option value="instructor">

                        Instructor

                    </option>

                </select>

                <button

                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"

                >

                    Register

                </button>

                <p className="text-center mt-5">

                    Already have an account?

                    <Link

                        to="/"

                        className="text-blue-600 ml-2"

                    >

                        Login

                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Register;