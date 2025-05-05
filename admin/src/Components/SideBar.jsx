import React from "react";
import { NavLink } from "react-router-dom";
import { FaFire, FaClipboardList, FaFileAlt } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>

      <NavLink
        to="/admin/Products"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 ${
            isActive ? "bg-gray-700" : ""
          }`
        }
      >
        <FaFire />
        Products
      </NavLink>

      <NavLink
        to="/admin/orders"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 ${
            isActive ? "bg-gray-700" : ""
          }`
        }
      >
        <FaClipboardList />
        Orders Placed
      </NavLink>

      {/* <NavLink
        to="/admin/report"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 ${
            isActive ? "bg-gray-700" : ""
          }`
        }
      >
        <FaFileAlt />
        Report
      </NavLink> */}
      <NavLink
        to="/admin/addproduct"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 ${
            isActive ? "bg-gray-700" : ""
          }`
        }
      >
        {/* <FontAwesomeIcon icon={faProductHunt} /> */}
        Add a product
      </NavLink>
    </div>
  );
};

export default AdminSidebar;
