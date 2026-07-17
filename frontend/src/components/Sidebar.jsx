import { Link } from "react-router-dom";



function Sidebar(){


const user = JSON.parse(localStorage.getItem("user"));



return(


<aside className="w-64 bg-white shadow min-h-screen">


<div className="p-6">



<h2 className="text-xl font-bold mb-8">

Navigation

</h2>





<ul className="space-y-4">





<li>

<Link

to="/dashboard"

className="block hover:text-blue-600"

>

Dashboard

</Link>

</li>







<li>

<Link

to="/courses"

className="block hover:text-blue-600"

>

Courses

</Link>

</li>








{/* Student */}

{

user?.role === "student" &&

<>


<li>

<Link

to="/my-courses"

className="block hover:text-blue-600"

>

My Courses

</Link>

</li>



<li>

<Link

to="/results"

className="block hover:text-blue-600"

>

Results

</Link>

</li>



</>

}









{/* Instructor */}


{

user?.role === "instructor" &&


<>


<li>

<Link

to="/add-course"

className="block hover:text-blue-600"

>

Add Course

</Link>

</li>





<li>

<Link

to="/lessons"

className="block hover:text-blue-600"

>

Lessons

</Link>

</li>





<li>

<Link

to="/add-lesson"

className="block hover:text-blue-600"

>

Add Lesson

</Link>

</li>







<li>

<Link

to="/add-quiz"

className="block hover:text-blue-600"

>

Add Quiz

</Link>

</li>





<li>

<Link

to="/quizzes"

className="block hover:text-blue-600"

>

Quiz List

</Link>

</li>



</>

}








{/* Admin */}


{

user?.role === "admin" &&

<>


<li>

<Link

to="/add-course"

className="block hover:text-blue-600"

>

Add Course

</Link>

</li>



<li>

<Link

to="/add-quiz"

className="block hover:text-blue-600"

>

Add Quiz

</Link>

</li>



</>

}





</ul>




</div>


</aside>



);


}



export default Sidebar;