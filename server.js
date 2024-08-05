const express = require("express"); // Import Express framework
const cors = require("cors"); // Import CORS middleware for handling cross-origin requests
const bodyParser = require("body-parser"); // Import body-parser middleware for parsing request bodies
const dotenv = require("dotenv"); // Import dotenv for environment variable management
const connectDB = require("./config/db"); // Import the database connection function
const userRoutes = require("./routes/userRoutes"); // Import user routes
const resumeRoutes = require("./routes/resumeRoutes"); // Import resume routes

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create an Express application
const app = express();

// CORS options
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS with specific options
app.use(bodyParser.json()); // Parse JSON request bodies

// Define routes
app.use("/api/users", userRoutes); // Use user routes
app.use("/api/resumes", resumeRoutes); // Use resume routes

// Define a port for the server
const PORT = process.env.PORT || 5000; // Use port from environment or default to 5000

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log that the server is running
});
