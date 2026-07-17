// Load environment variables
require("dotenv").config();


// Import packages
const express = require("express");
const cors = require("cors");


// Create Express App
const app = express();


// Middleware

// Allow React Frontend
app.use(cors({
    origin: "http://localhost:5173"
}));


// Read JSON requests
app.use(express.json());



// Import Routes

const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const quizRoutes = require("./routes/quizRoutes");
const resultRoutes = require("./routes/resultRoutes");
const uploadRoutes = require("./routes/uploadRoutes");





// API Routes

app.use("/users", userRoutes);

app.use("/courses", courseRoutes);

app.use("/lessons", lessonRoutes);

app.use("/enrollments", enrollmentRoutes);

app.use("/quizzes", quizRoutes);

app.use("/results", resultRoutes);

app.use("/upload", uploadRoutes);





// Home Test Route

app.get("/", (req, res) => {

    res.send("CloudLearn LMS API Server Running 🚀");

});




// Server Port

const PORT = process.env.PORT || 5000;




// Start Server

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});