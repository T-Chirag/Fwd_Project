import React, { useState, useMemo, useEffect } from "react";
import Card from "./Card"; // Import your Card component

function Recommendations() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data from an API
  useEffect(() => {
    // Mock API call
    const fetchProducts = async () => {
      setLoading(true);
      // Simulated delay for data fetching
      const fetchedProducts = await new Promise((resolve) =>
        setTimeout(() => {
          resolve([
            {
              id: 1,
              image: "https://via.placeholder.com/300x200",
              title: "Product 1",
              description: "This is a great product.",
              price: "19.99",
            },
            {
              id: 2,
              image: "https://via.placeholder.com/300x200",
              title: "Product 2",
              description: "You’ll love this item.",
              price: "29.99",
            },
            {
              id: 3,
              image: "https://via.placeholder.com/300x200",
              title: "Product 3",
              description: "A must-have product.",
              price: "39.99",
            },
            {
              id: 4,
              image: "https://via.placeholder.com/300x200",
              title: "Product 4",
              description: "High quality guaranteed.",
              price: "49.99",
            },
            {
              id: 5,
              image: "https://via.placeholder.com/300x200",
              title: "Product 5",
              description: "Best value for your money.",
              price: "59.99",
            },
            {
              id: 6,
              image: "https://via.placeholder.com/300x200",
              title: "Product 6",
              description: "A popular choice among customers.",
              price: "69.99",
            },
            {
              id: 7,
              image: "https://via.placeholder.com/300x200",
              title: "Product 7",
              description: "Limited stock available.",
              price: "79.99",
            },
            {
              id: 8,
              image: "https://via.placeholder.com/300x200",
              title: "Product 8",
              description: "Don’t miss out on this one.",
              price: "89.99",
            },
            {
              id: 9,
              image: "https://via.placeholder.com/300x200",
              title: "Product 9",
              description: "Highly recommended.",
              price: "99.99",
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
          <Card
            key={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
          />
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
