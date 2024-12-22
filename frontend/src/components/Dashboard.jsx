import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const userId = "exampleUserId"; // Replace with actual user ID logic

  // Fetch Products Listed by the User
  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/user/${userId}`).then((res) => {
      setProducts(res.data);
    });
  }, []);

  // Delete a Product
  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`).then(() => {
      setProducts(products.filter((product) => product._id !== id));
    });
  };

  // Update Product
  const updateProduct = (id, updatedDetails) => {
    axios.put(`http://localhost:5000/api/products/${id}`, updatedDetails).then((res) => {
      setProducts(
        products.map((product) => (product._id === id ? res.data : product))
      );
      setEditingProduct(null); // Close editing modal
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="p-4 border rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <div className="mt-2">
              <button
                onClick={() => setEditingProduct(product)}
                className="text-blue-500 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Editing Modal */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Edit Product</h3>
            <input
              type="text"
              className="border p-2 w-full mb-4"
              defaultValue={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  name: e.target.value,
                })
              }
            />
            <textarea
              className="border p-2 w-full mb-4"
              defaultValue={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              }
            />
            <button
              onClick={() =>
                updateProduct(editingProduct._id, {
                  name: editingProduct.name,
                  description: editingProduct.description,
                })
              }
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditingProduct(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
