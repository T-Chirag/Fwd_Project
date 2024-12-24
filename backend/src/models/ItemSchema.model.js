// Import mongoose to define schemas and interact with MongoDB
const mongoose = require('mongoose');

// Define a schema for the Item model
const itemSchema = new mongoose.Schema({
  // Name of the item
  name: {
    type: String,       // The data type is String
    required: true,     // This field is mandatory
    trim: true          // Automatically removes whitespace from the beginning and end
  },
  image:{
    type: String,
    required: true,
    trim: true
  },
  // Detailed description of the item
  description: {
    type: String,
    trim: true          // Automatically removes whitespace
  },
  // Condition of the item (e.g., new, like new, used)
  condition: {
    type: String,
    enum: ['new', 'like new', 'used', 'poor'], // Allowed values
    default: 'used'     // Default condition if not specified
  },
  // Category of the item (e.g., electronics, furniture)
  category: {
    type: String,
    required: true,
    trim: true
  },
  // Reference to the user who owns this item
  owner: {
    type: mongoose.Schema.Types.ObjectId, // Stores the ID of the User
    ref: 'User',                         // Refers to the User model
    required: true                       // Mandatory field
  },
  // Date when the item was listed
  listedAt: {
    type: Date,
    default: Date.now   // Default value is the current date and time
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

// Create a model using the schema
const Item = mongoose.model('Item', itemSchema);

// Export the model to use it in other parts of the application
module.exports = Item;
