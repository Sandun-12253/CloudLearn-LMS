import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";

import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import CourseDetails from "./pages/CourseDetails";

import Lessons from "./pages/Lessons";
import AddLesson from "./pages/AddLesson";

import MyCourses from "./pages/MyCourses";

import AddQuiz from "./pages/AddQuiz";
import Quizzes from "./pages/Quizzes";

import TakeQuiz from "./pages/TakeQuiz";
import Results from "./pages/Results";


import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";



function App(){


return(


<BrowserRouter>


<Routes>





{/* Login */}

<Route

path="/"

element={<Login />}

/>







{/* Register */}

<Route

path="/register"

element={<Register />}

/>









{/* Dashboard */}

<Route

path="/dashboard"

element={

<ProtectedRoute>

<Layout>

<Dashboard />

</Layout>

</ProtectedRoute>

}

/>









{/* All Courses */}

<Route

path="/courses"

element={

<ProtectedRoute>

<Layout>

<Courses />

</Layout>

</ProtectedRoute>

}

/>









{/* My Courses */}

<Route

path="/my-courses"

element={

<ProtectedRoute>

<Layout>

<MyCourses />

</Layout>

</ProtectedRoute>

}

/>









{/* Add Course */}

<Route

path="/add-course"

element={

<ProtectedRoute>

<Layout>

<AddCourse />

</Layout>

</ProtectedRoute>

}

/>









{/* Edit Course */}

<Route

path="/edit-course/:id"

element={

<ProtectedRoute>

<Layout>

<EditCourse />

</Layout>

</ProtectedRoute>

}

/>









{/* Course Details */}

<Route

path="/course/:id"

element={

<ProtectedRoute>

<Layout>

<CourseDetails />

</Layout>

</ProtectedRoute>

}

/>









{/* Lessons */}

<Route

path="/lessons"

element={

<ProtectedRoute>

<Layout>

<Lessons />

</Layout>

</ProtectedRoute>

}

/>









{/* Add Lesson */}

<Route

path="/add-lesson"

element={

<ProtectedRoute>

<Layout>

<AddLesson />

</Layout>

</ProtectedRoute>

}

/>









{/* Add Quiz */}

<Route

path="/add-quiz"

element={

<ProtectedRoute>

<Layout>

<AddQuiz />

</Layout>

</ProtectedRoute>

}

/>









{/* Quiz List */}

<Route

path="/quizzes"

element={

<ProtectedRoute>

<Layout>

<Quizzes />

</Layout>

</ProtectedRoute>

}

/>









{/* Take Quiz */}

<Route

path="/take-quiz/:course_id"

element={

<ProtectedRoute>

<Layout>

<TakeQuiz />

</Layout>

</ProtectedRoute>

}

/>









{/* Results */}

<Route

path="/results"

element={

<ProtectedRoute>

<Layout>

<Results />

</Layout>

</ProtectedRoute>

}

/>







</Routes>


</BrowserRouter>


);


}


export default App;