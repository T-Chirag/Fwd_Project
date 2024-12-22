// Import mongoose to define schemas and interact with MongoDB
const mongoose = require('mongoose');

// Define a schema for the Chat model
const chatSchema = new mongoose.Schema({
  // References the user who sent the message
  sender: {
    type: mongoose.Schema.Types.ObjectId, // References the User model
    ref: 'User',
    required: true
  },
  // References the user who received the message
  recipient: {
    type: mongoose.Schema.Types.ObjectId, // References the User model
    ref: 'User',
    required: true
  },
  // The content of the message
  message: {
    type: String,
    required: true,
    trim: true // Automatically removes whitespace from the beginning and end
  },
  // Timestamp when the message was sent
  sentAt: {
    type: Date,
    default: Date.now // Default value is the current date and time
  }
});

// Create a model using the schema
const Chat = mongoose.model('Chat', chatSchema);

// Export the model to use it in other parts of the application
module.exports = Chat;
