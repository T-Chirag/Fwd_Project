import fs from 'fs';
import { uploadOnCloudinary} from '../utils/cloudnary.js'; // Assuming you have a separate cloudinary file
import User from '../models/User.model.js';  // Correct the path for User model
import { upload } from '../middlewares/multer.middleware.js';

const avatarImage = async (req, res) => {
  try {
    console.log('File received:', req.files);  // Log the file to check if it's being received

    // Access file from req.file since we're using upload.single()
    const avatarLocalPath = req.files?.path;

    if (!avatarLocalPath) {
      return res.status(400).json({ error: "Avatar image is required" });
    }

    // Upload the file to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
      fs.unlinkSync(avatarLocalPath); // Cleanup the local file if Cloudinary upload fails
      return res.status(500).json({ error: "Error uploading image" });
    }

    // Create the user with the Cloudinary URL
    const user = await User.create({ avatarImage: avatar.url });

    // Check if user creation was successful
    const isUserCreated = await User.findById(user._id).select("-password");
    if (!isUserCreated) {
      fs.unlinkSync(avatarLocalPath); // Cleanup the file if user creation fails
      return res.status(500).json({ error: "Error creating user" });
    }

    // Clean up the local file after successful operations
    fs.unlinkSync(avatarLocalPath);

    return res.status(200).json({ user: isUserCreated });
  } catch (error) {
    console.error("Error during file upload and user creation:", error);
    res.status(500).json({ error: "Server error" });
  }
};


export { avatarImage };
