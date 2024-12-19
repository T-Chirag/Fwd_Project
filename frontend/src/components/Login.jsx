import React, { useState } from "react";
import "../index.css";
import GoogleLoginButton from './GoogleLoginButton.jsx'

function Login() {
  const [activeButton, setActiveButton] = useState("login"); // "login" is active by default

  return (
    <div className="flex flex-row bg-blue-600 w-screen h-screen">
      {/* Left Side Buttons */}
      <div className="w-7/12 bg-blue-600 flex flex-col items-end">
        <button
          onClick={() => setActiveButton("login")}
          className={`relative my-2 p-3 top-52 w-40 right-0 rounded-l-[30px] text-white transition-all duration-300 transform ${
            activeButton === "login"
              ? "bg-blue-800 scale-105 shadow-lg"
              : "bg-blue-600 hover:scale-105"
          }`}
        >
          LOGIN
        </button>
        <button
          onClick={() => setActiveButton("signup")}
          className={`relative p-3 my-2 top-52 w-40 right-0 rounded-l-[30px] text-white transition-all duration-300 transform ${
            activeButton === "signup"
              ? "bg-blue-800 scale-105 shadow-lg"
              : "bg-blue-600 hover:scale-105"
          }`}
        >
          SIGNUP
        </button>
      </div>

      {/* Right Side Content */}
      <div className="w-5/12 h-[85%] rounded-bl-[100px] bg-white p-8 overflow-hidden relative">
        <div className="relative h-full w-full flex justify-center">
          {activeButton === "login" ? (
            <div
              className="absolute inset-0 animate-fadeIn transition-transform transform translate-x-0 duration-500 flex flex-col top-12 items-center"
              key="login"
            >
              {/* Login Form */}
              <h2 className="text-2xl font-bold mb-6">Login</h2>
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-96 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-1 text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-96 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <a
                href="#"
                className="text-blue-600 text-sm hover:underline mb-4 inline-block"
              >
                Forget Password?
              </a>
              <button className="w-96 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">
                LOGIN
              </button>
            </div>
          ) : (
            <div
              className="absolute inset-0 animate-fadeIn transition-transform transform translate-x-0 duration-500 flex flex-col top-12 items-center"
              key="signup"
            >
              {/* Signup Form */}
              <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-96 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-96 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-1 text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-96 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <button className="w-96 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">
                SIGN UP
              </button>

              <GoogleLoginButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
