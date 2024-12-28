import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user'); // Replace with your actual API endpoint
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchUserItems = async () => {
      try {
        const response = await axios.get('/api/items'); // Replace with your actual API endpoint
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching user items:', error);
      }
    };

    fetchUserData();
    fetchUserItems();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h1>

      <div className="my-items">
        <h2 className="text-xl font-semibold mb-2">My Items</h2>
        <ul className="list-disc pl-6">
          {items.map((item) => (
            <li key={item._id} className="mb-2">
              <Link to={`/item/${item._id}`} className="text-blue-500 hover:underline">
                {item.name}
              </Link> 
            </li>
          ))}
        </ul>
      </div>

      <div className="actions mt-4">
        <Link to="/create-item" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create New Item
        </Link>
        <Link to="/my-swaps" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded ml-4">
          View My Swaps
        </Link> 
        {/* Add other relevant actions here */}
      </div>
    </div>
  );
};

export default Dashboard;