import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const SimpleNavbar = () => {
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
            <Link to="/cart" className="hover:text-red-500">Cart</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-red-500">Contact</Link>
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default SimpleNavbar;
