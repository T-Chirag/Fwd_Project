import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login status
  const navigate = useNavigate();

  // Simulate checking login status (could be an API call or localStorage)
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Handle logout
      localStorage.removeItem("isLoggedIn"); // Clear login data
      setIsLoggedIn(false); // Update state
      navigate("/login"); // Redirect to login page
    } else {
      // Handle login (this would typically redirect to a login flow)
      localStorage.setItem("isLoggedIn", "true"); // Simulate login
      setIsLoggedIn(true); // Update state
      navigate("/dashboard"); // Redirect to dashboard after login
    }
  };

  return (
    <div
      className="relative flex w-10 h-18 justify-center items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger */}
      <button className="h-7 w-7 items-center" onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="100%"
          viewBox="0 -960 960 960"
          width="100%"
          fill="#FFFFFF"
        >
          <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-7 -right-50 bg-black text-white rounded shadow-lg w-48 z-50">
          <a
            href="/dashboard"
            className="block px-4 py-2 text-white/80 hover:bg-gray-100 hover:text-gray-700"
          >
            Dashboard
          </a>
          <a
            href="/my-trades"
            className="block px-4 py-2 text-white/80 hover:bg-gray-100 hover:text-gray-700"
          >
            My Trades
          </a>
          <button
            onClick={handleLoginLogout}
            className="block w-full text-left px-4 py-2 text-white/80 hover:bg-gray-100 hover:text-gray-700"
          >
            {isLoggedIn ? "Log Out" : "Log In"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
