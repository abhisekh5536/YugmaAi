import React from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  // Check if we're on the home route
  const isHomeRoute = location.pathname === '/';
  
  // Define different styling based on route
  const navbarClasses = isHomeRoute 
    ? "fixed top-0 left-0 w-full z-10" 
    : "fixed top-0 left-0 w-full z-10 bg-gray-900 shadow-md";
  
  const containerClasses = isHomeRoute
    ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
  
  const innerContainerClasses = isHomeRoute
    ? "relative flex items-center justify-between h-16 bg-white/10 backdrop-blur-lg rounded-full shadow-lg mt-5 sm:mt-10"
    : "flex items-center justify-between h-16";
  
  const linkClasses = isHomeRoute
    ? "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium";

  return (
    <nav className={navbarClasses}>
      <div className={containerClasses}>
        <div className={innerContainerClasses}>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a
                  href="/"
                  className={linkClasses}
                >
                  Home
                </a>
                <a
                  href="#"
                  className={linkClasses}
                >
                  About
                </a>
                <a
                  href="#"
                  className={linkClasses}
                >
                  Services
                </a>
                <a
                  href="#"
                  className={linkClasses}
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              className="p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mr-8"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;