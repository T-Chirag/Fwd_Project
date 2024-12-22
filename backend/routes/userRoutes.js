import express from "express";
import { registerUser, loginUser, getUserById } from "../src/controllers/UserController";

const userRoutes = express.Router();

// Route to register a new user
userRoutes.post("/register", registerUser);

// Route to login a user
userRoutes.post("/login", loginUser);

// Route to fetch user details (requires authentication)
userRoutes.get("/:id", getUserById);

export default userRoutes;
