import bcrypt from "bcrypt"; // For hashing passwords
import jwt from "jsonwebtoken"; // For generating authentication tokens
import User from "../models/User.model.js"; // Import the User model
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponce } from "../utils/ApiResponce.js";

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
  }
  

    // Hash the password
    const hashedPassword = await bcrypt.hash(password,12);

    // Create and save the new user
    const newUser = new User({ name, username, email, password: hashedPassword });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email ,username, password } = req.body;

    // Find the user by email or username
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const accessToken = await jwt.sign({ userId: user._id }, "CrGt_127716", {
      expiresIn: "1h",
    });

    const refreshToken = await jwt.sign({ userId: user._id },"CrGt_127728", { expiresIn: "7d" });
    
    const loggedInUser = await User.findById(user._id).select("-password -refreshtoken");

    const options ={
        httpOnly:true,
        secure: true,
    }

    res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("RefreshToken",refreshToken,options)
    .json(
        new ApiResponce(
          200,
          {
            user :loggedInUser,
            accessToken,
            refreshToken,
          },
          "User logged in successfully",
        )
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

//Logout user
const logoutUser = async(req,res) =>{
  try{
    const options ={
      httpOnly:true,
      secure: true,
  }
  
   User.findByIdAndUpdate(
    req.user._id,
    {
        $set: { refreshToken: undefined },
    },
    {
        new: true,
        
    }
   )

   res.status(200).clearCookie("accessToken" ,options).clearCookie("refreshToken",options).json({message:"Logout successfully"});
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Server error"});
  }
};

//refresh access token
const refreshAccessToken = async(req,res) =>{
  try {
    const incomingRefreshToken = req.cookies.refreshToken;
    if(!incomingRefreshToken){
      return res.status(403).json({error:"Unauthorized"});
    }
    verifiedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECERT);

    const temp_user = await User.findById(verifiedToken.userId)

    if(!temp_user){
      return res.status(403).json({error:"User not authenticated"});
    }

    if(temp_user.refreshToken !== incomingRefreshToken){
      return res.status(403).json({error:"refresh token not valid"});

    }

    const options ={
      httpOnly:true,
      secure: true,
    }
    //generate new access token and refresh token
    const newAccessToken = await jwt.sign({userId:temp_user._id},process.env.ACCESS_TOKEN_SECERT,{expiresIn:"1h"});
    const newRefreshToken = await jwt.sign({userId:temp_user._id},process.env.REFRESH_TOKEN_SECERT,{expiresIn:"7d"});

    return(
      res
      .status(200)
      .cookie("accessToken",newAccessToken,options)
      .cookie("RefreshToken",newRefreshToken,options)
      .json({message:"Access token refreshed successfully"})  
    )
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Server error"});
  }
}

// Get user details by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export{registerUser, loginUser, getUserById, logoutUser , refreshAccessToken};
