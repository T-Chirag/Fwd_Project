import bcrypt from "bcrypt"; // For hashing passwords
import jwt from "jsonwebtoken"; // For generating authentication tokens
import User from "../models/User.model.js"; // Import the User model
import { uploadOnCloudinary } from "../utils/cloudnary.js";

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

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
    const { loginKey, password } = req.body;

    // Find the user by email or username
    const user = await User.findOne({
      $or: [{ email: loginKey }, { username: loginKey }],
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
    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const avatarImage = async(req,res) => {
  try{
    const avatarLocalPath = req.files?.avatar[0]?.path;

    if(!avatarLocalPath){
      return res.status(400).json({error: "Avatar image is required"});
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(!avatar){
      return res.status(500).json({error: "Error uploading image"});
    }

    const user = await User.create({avatarImage: avatar.url});
    const isUserCreated = await User.findById(user._id);
    if(isUserCreated){
      return res.status(500).json({error: "Error creating user"});
    }

  }catch(error){
    console.error(error);
    res.status(500).json({error: "Server error"});
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

export{registerUser, loginUser, getUserById, avatarImage};
