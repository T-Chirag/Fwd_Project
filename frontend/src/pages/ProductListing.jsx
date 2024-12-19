import React, { useState, useEffect } from "react";
import Card from "../components/ProductCard"; // Your reusable Card component

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const mockProducts = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `Product ${i + 1}`,
        description: `Description for Product ${i + 1}`,
        image: "https://via.placeholder.com/300x300",
        price: `${(Math.random() * 100).toFixed(2)}`,
      }));
      setTimeout(() => {
        setProducts(mockProducts);
        setLoading(false);
      }, 1000);
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Explore Our Products</h1>

      {/* Filter and Sort */}
      <div className="sticky top-0 bg-white z-10 shadow p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2">
              Filter
            </button>
            <button className="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300">
              Sort
            </button>
          </div>
          <span className="text-gray-600">{products.length} items found</span>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <p className="text-lg text-gray-500">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
          {products.map((product) => (
            <Card
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListing;
