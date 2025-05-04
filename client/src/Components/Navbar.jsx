import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // Import useAuth hook


const SimpleNavbar = () => {
  const { user, logout } = useAuth();  // Get user state and logout function
  console.log(user);
  const handleLogout = () => {
    logout();  // Call logout when the button is clicked
  };
  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 shadow-lg bg-white`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <h1
          className={`text-2xl font-bold transition-all duration-300 `}
          style={{ fontFamily: "'Tektur', sans-serif" }}
        >
          Vishal Super Market
        </h1>
        <ul
          className={`flex gap-6 text-lg font-medium transition-all duration-300 `}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <li>
            <Link to="/" className="hover:text-red-500">Home</Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-red-500">Products</Link>
          </li>
          <li>
            {/* <Link to="/cart" className="hover:text-red-500">Cart</Link> */}
          </li>
          <li>
            <Link to="/contact" className="hover:text-red-500">Contact</Link>
          </li>
          <li>
            {/* <Link to="/add-product" className="hover:text-red-500">Add Product</Link> */}
          </li>
          <li>
            <div className="hover:text-red-500"> 
            👋  {user?.username || "Guest"}
            </div>
          </li>
          {/* Conditional rendering for login/logout */}
          {!user ? (
            <>
              <li>
                <Link to="/login" className="hover:text-red-500">Login</Link>
              </li>

            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                 Logout
              </button>


            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default SimpleNavbar;
