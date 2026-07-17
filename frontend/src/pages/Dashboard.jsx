import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <div>

            <h1 className="text-4xl font-bold mb-8">

                Dashboard

            </h1>

            <div className="grid grid-cols-4 gap-6">

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-xl font-bold">

                        Welcome

                    </h2>

                    <p className="mt-3">

                        {user?.name}

                    </p>

                </div>

                <div className="bg-blue-600 text-white rounded-xl shadow p-6">

                    <h2 className="text-xl">

                        Courses

                    </h2>

                    <p className="text-5xl mt-4">

                        📚

                    </p>

                </div>

                <div className="bg-green-600 text-white rounded-xl shadow p-6">

                    <h2 className="text-xl">

                        Lessons

                    </h2>

                    <p className="text-5xl mt-4">

                        🎥

                    </p>

                </div>

                <div className="bg-purple-600 text-white rounded-xl shadow p-6">

                    <h2 className="text-xl">

                        Quizzes

                    </h2>

                    <p className="text-5xl mt-4">

                        📝

                    </p>

                </div>

            </div>

            <div className="mt-10 bg-white rounded-xl shadow p-8">

                <h2 className="text-2xl font-bold mb-4">

                    Logged In User

                </h2>

                <p>

                    <strong>Name:</strong> {user?.name}

                </p>

                <p>

                    <strong>Email:</strong> {user?.email}

                </p>

                <p>

                    <strong>Role:</strong> {user?.role}

                </p>

                <button

                    onClick={() => navigate("/courses")}

                    className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"

                >

                    View Courses

                </button>

            </div>

        </div>

    );

}

export default Dashboard;