import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Card from "../components/ProductCard"; 
import SearchBar from "../components/SearchBar"; 

function ProductListing() {
  const [products, setProducts] = useState([]); // Original product list
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered product list
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [filterPrice, setFilterPrice] = useState(""); // Price filter

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || ""; // Extract category from query params

  // Simulate fetching data
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const mockProducts = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `Product ${i + 1}`,
        category:
          i % 3 === 0
            ? "Books"
            : i % 3 === 1
            ? "Shoes"
            : "Gadgets", // Alternate categories: Books, Shoes, Gadgets
        description: `Description for Product ${i + 1}`,
        image: "https://via.placeholder.com/300x300",
        price: parseFloat((Math.random() * 100).toFixed(2)),
      }));
      setTimeout(() => {
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setLoading(false);
      }, 1000);
    };
    fetchProducts();
  }, []);

  // Handle filtering by category, search query, and price
  useEffect(() => {
    let updatedProducts = products;

    // Filter by category
    if (category) {
      updatedProducts = updatedProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price (e.g., "<50", ">=50")
    if (filterPrice === "<50") {
      updatedProducts = updatedProducts.filter((product) => product.price < 50);
    } else if (filterPrice === ">=50") {
      updatedProducts = updatedProducts.filter((product) => product.price >= 50);
    }

    setFilteredProducts(updatedProducts);
  }, [category, searchQuery, filterPrice, products]);

  return (
    <div className="min-h-screen bg-gray-900 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        {category ? `Explore ${category}` : "Explore Our Products"}
      </h1>

      {/* Search Bar and Filter Options */}
      <div className=" top-0 bg-white/0 z-10 p-4 mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        {/* Search Bar */}
        <div className="flex-1">
          <SearchBar
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
        </div>

        {/* Filter Options */}
        <div className="mt-4 mx-3 sm:mt-0">
          <select
            className="bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
          >
            <option value="">Filter by Price</option>
            <option value="<50">Less than $50</option>
            <option value=">=50">Greater than or equal to $50</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <p className="text-lg text-gray-500">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))
          ) : (
            <div className="text-center col-span-full">
              <p className="text-lg text-gray-500">No products found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductListing;
