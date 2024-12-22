const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  value: Number,
  listedBy: String, // User ID
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
