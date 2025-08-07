import React from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';
  
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
          <div className="flex items-center px-6 select-none ">
            <img src="/Yugma_Logo.png" alt="Yugma Ai Logo" className="h-8 w-8" draggable="false"/>
            <span className="text-white text-2xl font-bold">Yugma Ai</span>
          </div>

          <div className="flex-1 flex items-center justify-end px-6">
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a href="/" className={linkClasses}>Home</a>
                <a href="/about" className={linkClasses}>About</a>
                <a href="#" className={linkClasses}>Services</a>
                <a href="#" className={linkClasses}>Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;