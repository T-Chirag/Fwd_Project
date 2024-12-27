import express from "express";
import { registerUser, loginUser, logoutUser } from "../src/controllers/UserController.js";
import { upload } from "../src/middlewares/multer.middleware.js";
import { avatarImage } from "../src/controllers/AvatarUpload.js";
import { verifyJWT } from "../src/middlewares/Auth.middleware.js";


const userRoutes = express.Router();

userRoutes.post('/avatarimage', upload.single('avatarImage'), avatarImage);
userRoutes.route("/register").post(registerUser);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/logout").post( verifyJWT , logoutUser);


export default userRoutes;
