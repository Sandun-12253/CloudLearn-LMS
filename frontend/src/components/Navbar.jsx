import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <nav className="bg-blue-700 text-white shadow">

            <div className="flex justify-between items-center px-8 py-4">

                <h1 className="text-2xl font-bold">
                    CloudLearn LMS
                </h1>

                <div className="flex items-center gap-5">

                    <div>

                        <p className="font-semibold">
                            {user?.name}
                        </p>

                        <p className="text-sm">
                            {user?.role}
                        </p>

                    </div>

                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;