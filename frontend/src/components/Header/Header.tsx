import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Highway Delite Logo"
            className="w-35 h-18"
          />
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search experiences"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg transition">
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
