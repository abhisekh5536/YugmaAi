import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';
  const mobileMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const navbarClasses = isHomeRoute 
    ? "fixed top-0 left-0 w-full z-50" 
    : "fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-md";
  
  const containerClasses = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
  
  const innerContainerClasses = isHomeRoute
    ? "relative flex items-center justify-between h-16 bg-white/10 backdrop-blur-lg rounded-full shadow-lg mt-5 sm:mt-10"
    : "flex items-center justify-between h-16";
  
  const linkClasses = "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium";

  // Modern hamburger icon with animation
  const HamburgerIcon = ({ isOpen }) => (
    <div className="flex flex-col justify-center items-center w-6 h-6">
      <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
      <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out mt-1 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
      <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out mt-1 ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
    </div>
  );

  return (
    <nav className={navbarClasses}>
      <div className={containerClasses}>
        <div className={innerContainerClasses}>
          <div className="flex items-center px-6 select-none">
            <img src="/Yugma_Logo.png" alt="Yugma Ai Logo" className="h-8 w-8" draggable="false"/>
            <span className="text-white text-2xl font-bold ml-2">Yugma Ai</span>
          </div>

          <div className="flex-1 flex items-center justify-end px-6">
            {/* Modern Hamburger Button - Better positioned */}
            <div className="sm:hidden ml-6">
              <button 
                type="button" 
                className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-md focus:ring-2 focus:ring-white focus:ring-opacity-50"
                onClick={toggleMobileMenu}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <HamburgerIcon isOpen={mobileMenuOpen} />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a href="/" className={linkClasses}>Home</a>
                <a href="/about" className={linkClasses}>About</a>
                <a href="#" className={linkClasses}>Contact</a>

                {localStorage.getItem('token') ? (
                  <div className="flex items-center ml-4">
                    <a 
                      href="/dashboard" 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Dashboard
                    </a>
                  </div>
                ) : (
                  <div className="flex items-center ml-4">
                    <a 
                      href="/login" 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Login/Sign Up
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu with Slide Animation */}
        <div 
          ref={mobileMenuRef}
          className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
        >
          <div className="bg-gray-900/95 backdrop-blur-lg rounded-xl mx-4 p-4 space-y-3 shadow-2xl border border-gray-700">
            <a 
              href="/" 
              className="block px-4 py-3 rounded-lg text-base font-medium text-white hover:bg-gray-700/50 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="/about" 
              className="block px-4 py-3 rounded-lg text-base font-medium text-white hover:bg-gray-700/50 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#" 
              className="block px-4 py-3 rounded-lg text-base font-medium text-white hover:bg-gray-700/50 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            {localStorage.getItem('token') ? (
              <a 
                href="/dashboard" 
                className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-white hover:bg-gray-700/50 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </a>
            ) : (
              <a 
                href="/login" 
                className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-white hover:bg-gray-700/50 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login/Sign Up
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;