import express from "express";
import { registerUser, loginUser, getUserById } from "../src/controllers/UserController.js";

const userRoutes = express.Router();

userRoutes.route("/register").post(registerUser);
userRoutes.route("/login").post(loginUser);


export default userRoutes;
