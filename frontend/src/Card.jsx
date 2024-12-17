import React from "react";

function Card({ image, title, description, price }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      {/* Card Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2 text-sm">{description}</p>
        <p className="text-lg font-bold text-gray-900 mt-4">${price}</p>
      </div>
    </div>
  );
}

export default Card;
