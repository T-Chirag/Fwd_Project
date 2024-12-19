import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "./ProductCard"; // Import the new ProductCard component

function Recommendations() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data from an API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // Simulated delay for data fetching
      const fetchedProducts = await new Promise((resolve) =>
        setTimeout(() => {
          resolve([
            {
              id: 1,
              image: "https://via.placeholder.com/300x200",
              name: "Product 1",
              description: "This is a great product.",
              discountedPrice: 19.99,
              originalPrice: 29.99,
              badge: "New Arrival",
            },
            {
              id: 2,
              image: "https://via.placeholder.com/300x200",
              name: "Product 2",
              description: "You’ll love this item.",
              discountedPrice: 29.99,
              badge: "Hot Deal",
            },
            {
              id: 3,
              image: "https://via.placeholder.com/300x200",
              name: "Product 3",
              description: "A must-have product.",
              discountedPrice: 39.99,
            },
            {
              id: 4,
              image: "https://via.placeholder.com/300x200",
              name: "Product 4",
              description: "High quality guaranteed.",
              discountedPrice: 49.99,
              originalPrice: 59.99,
            },
            {
              id: 5,
              image: "https://via.placeholder.com/300x200",
              name: "Product 5",
              description: "Best value for your money.",
              discountedPrice: 59.99,
            },
            {
              id: 6,
              image: "https://via.placeholder.com/300x200",
              name: "Product 6",
              description: "A popular choice among customers.",
              discountedPrice: 69.99,
              originalPrice: 79.99,
              badge: "Limited Offer",
            },
          ]);
        }, 1000)
      );

      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Memoize the product grid to avoid unnecessary re-renders
  const productGrid = useMemo(() => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }, [products]);

  return (
    <div className="bg-black py-10 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Recommended for You
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <p className="text-lg font-semibold text-gray-300">Loading...</p>
        </div>
      ) : (
        productGrid
      )}
    </div>
  );
}

export default Recommendations;
