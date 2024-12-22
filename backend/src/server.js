// Import necessary modules
import express from "express"; // Import Express framework
import dotenv from "dotenv"; // For environment variables
import cors from "cors"; // To handle Cross-Origin Resource Sharing
import bodyParser from "body-parser"; // To parse incoming request bodies
import connectDB from "./db/db.js"; // Import the database connection
import userRoutes  from "../routes/userRoutes.js";  // Import user-related routes

// Load environment variables
dotenv.config({
  path: './env', // Load environment variables from the .env file
});

// Initialize the Express app
const app = express();

// Apply middleware
app.use(cors()); // Enable CORS to allow requests from different origins
app.use(bodyParser.json()); // Parse JSON payloads in incoming requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded payloads

// Database connection
(async () => {
  try {
    await connectDB();
    console.log("Database connected successfully!");

    // Define routes
    app.use("/api/users", userRoutes); // Route for user-related operations

    // Start the server
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the process if database connection fails
  }
})();