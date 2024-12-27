import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="relative bg-white border rounded-lg shadow-md overflow-hidden">

      {/* Image with Scale Effect */}
      <div className="h-96 bg-gray-100 flex justify-center items-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mt-1 truncate">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-green-600 font-bold text-lg">
              ₹{product.discountedPrice}
            </span>{" "}
            {product.originalPrice && (
              <span className="text-gray-800 line-through text-sm ml-2">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <button className="bg-blue-600 text-white px-4 py-1 text-sm font-semibold rounded hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;