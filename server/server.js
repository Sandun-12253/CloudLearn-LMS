// Load environment variables
require("dotenv").config();


// Import packages
const express = require("express");
const cors = require("cors");


// Create Express App
const app = express();


// Allowed Frontend URLs
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://cloudlearn-group-307217365948-307217365948-eu-north-1-an.s3-website.eu-north-1.amazonaws.com"
];


// Middleware - CORS
app.use(cors({
    origin: function (origin, callback) {

        // Allow requests without origin (Postman, server-to-server)
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
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