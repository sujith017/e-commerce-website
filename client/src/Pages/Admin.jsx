import React from "react";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-5">Admin Panel</h2>
        <ul>
          <li className="mb-2">
            <Link to="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/orders" className="hover:text-gray-300">View Orders</Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/products" className="hover:text-gray-300">Manage Products</Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/logout" className="hover:text-red-400">Logout</Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
