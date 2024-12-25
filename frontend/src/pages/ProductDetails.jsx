import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "../assets/Swapify-logo.png";

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    // Fetch product data from backend
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${productId}`);
        const data = response.data;
        setProduct(data);
        setSelectedImage(data.images[0] || Image); // Set the first image as default
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Product Images */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-xl mb-4">
          <img
            src={selectedImage}
            alt="Selected Product"
            className="w-full rounded-lg border shadow-lg"
          />
        </div>
        <div className="flex justify-center gap-2">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product ${index + 1}`}
              className="w-20 h-20 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-700 text-lg">{product.description}</p>
      </div>

      {/* Lister Details */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Listed by:</h2>
        <p className="text-gray-800">Name: {product.lister.name}</p>
        <p className="text-gray-800">Contact: {product.lister.contact}</p>
        <p className="text-gray-800">Location: {product.lister.location}</p>
      </div>

      {/* Chat Button */}
      <div className="mt-6 text-center">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Chat with Lister
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
