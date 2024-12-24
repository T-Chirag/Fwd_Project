// Import mongoose to define schemas and interact with MongoDB
const mongoose = require('mongoose');

// Define a schema for the Trade model
const tradeSchema = new mongoose.Schema({

  //Trade id
  tradeId: {
    type: String,
    required: true,
    unique: true
  },
  // The item being offered for trade
  offeredItem: {
    type: mongoose.Schema.Types.ObjectId, // References the Item model
    ref: 'Item',
    required: true
  },
  // The item being requested in return
  requestedItem: {
    type: mongoose.Schema.Types.ObjectId, // References the Item model
    ref: 'Item',
    required: true
  },
  // The user initiating the trade
  initiatedBy: {
    type: mongoose.Schema.Types.ObjectId, // References the User model
    ref: 'User',
    required: true
  },
  // Current status of the trade
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled'], // Allowed values
    default: 'pending'  // Default status is "pending"
  },
  // History of negotiations (e.g., price, conditions)
  negotiationHistory: [
    {
      message: String,                    // The message or offer detail
      timestamp: { type: Date, default: Date.now }, // Time when the message was sent
      sender: {                           // The user who sent the message
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  // Timestamp when the trade was created
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model using the schema
const Trade = mongoose.model('Trade', tradeSchema);

// Export the model to use it in other parts of the application
module.exports = Trade;
