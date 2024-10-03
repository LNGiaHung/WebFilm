// Header.tsx
import React from "react";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-black bg-opacity-90 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/">
          <img
            src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
            alt="Netflix Logo"
            className="h-8"
          />
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Link to="/Login"><FaUser className="text-2xl" /></Link>
          <FaBell className="text-2xl" />
        </div>
      </div>
    </header>
  );
};

export default Header;
