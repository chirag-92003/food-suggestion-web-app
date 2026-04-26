import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const handleRedirect = () => {
    window.location.href = "/";
  };

  return (
    <nav className="bg-black text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div
          className="text-xl font-bold font-mono hover: cursor-pointer"
          onClick={handleRedirect}
        >
          Diet App
        </div>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "hover:text-gray-300 transition"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/meals"
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "hover:text-gray-300 transition"
              }
            >
              Meals
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/progress"
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "hover:text-gray-300 transition"
              }
            >
              Progress
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "hover:text-gray-300 transition"
              }
            >
              Settings
            </NavLink>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
