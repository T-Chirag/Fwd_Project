// Import mongoose to define schemas and interact with MongoDB

import mongoose from 'mongoose';
import { avatarImage } from '../controllers/UserController';

// Define a schema for the User model
const userSchema = new mongoose.Schema({
  // User's name
  name: {
    type: String,       // The data type is String
    required: true,     // This field is mandatory
    trim: true          // Automatically removes whitespace from the beginning and end
  },
  //User's username
  username: {
    type: String,
    required: true,
    unique: true,       // Ensures no two users can have the same username
    trim: true
  },
  //Rating 
  rating:{
    type: Number,
    default: 0
  },
  avatarImage:{
    type: String,
    
  },

  // User's email address
  email: {
    type: String,
    required: true,
    unique: true,       // Ensures no two users can have the same email
    trim: true,
    lowercase: true     // Converts the email to lowercase before saving
  },
  // User's password
  password: {
    type: String,
    required: true,
    minlength: 6        // Ensures the password is at least 6 characters long
  },
  // Date when the user was created
  createdAt: {
    type: Date,
    default: Date.now   // Sets the default value to the current date and time
  }
});

// Create a model using the schema
const User = mongoose.model('User', userSchema);

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({
        _id: this._id 
    },
        process.env.ACCESS_TOKEN_SECRET,
    { 
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    } );
  return token;
};

// Export the model to use it in other parts of the application
export default User;
