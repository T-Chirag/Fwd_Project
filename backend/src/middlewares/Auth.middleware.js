import jwt from "jsonwebtoken";
import User from "../models/User.model.js";


export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        console.log(token);
        if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT);
        const user = await User.findById(decodedToken?.userId).select("-password -refreshToken");
        console.log(user);
        
        if (!user) {
        return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ error: "Server error", message: error.message });
        
    }
}