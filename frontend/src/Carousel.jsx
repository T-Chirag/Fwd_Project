import React, { useState } from "react";

function Carousel({ images, height }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div
      className="relative w-screen overflow-hidden -z-10"
      style={{ height: height }}
    >
      {/* Image Slider */}
      <div className="flex transition-transform duration-500 ease-in-out">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-screen h-full flex-shrink-0 ${
              index === currentIndex ? "block" : "hidden"
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex justify-center gap-1 w-full px-4">
        <button
          onClick={prevSlide}
          className="bg-black text-white p-3 rounded-l-full shadow-md hover:bg-gray-700 focus:outline-none"
        >
          &#60;
        </button>
        <button
          onClick={nextSlide}
          className="bg-black text-white p-3 rounded-r-full shadow-md hover:bg-gray-700 focus:outline-none"
        >
          &#62;
        </button>
      </div>
    </div>
  );
}

export default Carousel;