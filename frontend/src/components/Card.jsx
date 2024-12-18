import React from "react";

function Card({ image, title, description, price }) {
  return (
    <div className="max-w-sm bg-white/30 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden">
      {/* Card Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="text-gray-300 mt-2 text-sm">{description}</p>
        <p className="text-lg font-bold text-white mt-4">${price}</p>
      </div>
    </div>
  );
}

export default Card;
