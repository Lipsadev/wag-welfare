import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout, isLoading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ✅ Auto-open dropdown when user logs in
  useEffect(() => {
    if (user) setDropdownOpen(true);
  }, [user]);

  if (isLoading) return null; // ⏳ Prevent flicker on initial load

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo / Home */}
      <Link to="/" className="text-2xl font-bold text-orange-500">
        🐾 PawRescue
      </Link>

      {/* If logged in, show user dropdown */}
      {user ? (
        <div className="relative">
          {/* Circular user button */}
          <button
            className="w-10 h-10 rounded-full bg-green-400 text-white font-bold flex items-center justify-center"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            {user.name.charAt(0).toUpperCase()}
          </button>

          {/* Dropdown card */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 z-10">
              <Link
                to="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={() => setDropdownOpen(false)}
              >
                Dashboard
              </Link>

              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={() => {
                  logout(); // 👈 instantly triggers re-render
                  setDropdownOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-x-2">
          <Link
            to="/login"
            className="px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
