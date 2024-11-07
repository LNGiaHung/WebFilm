import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Header = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { auth, logout, user } = useAuth();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  const handleAuthAction = () => {
    if (auth.accessToken) {
      logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="antialiased font-jakarta">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow-md">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <Link to="/" className="flex mr-4">
              <img src="https://img.icons8.com/?size=100&id=8NXZZAzJ6OYY&format=png&color=000000" className="mr-3 h-8" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white font-poppins text-[20px]">Mua He Xanh</span>
            </Link>
          </div>
          <div className="flex items-center lg:order-2">
            {user && (
              <div className="flex items-center mr-4">
                <span className="text-sm text-gray-700 dark:text-gray-300 mr-2 font-inter">
                  {user.name ?? 'User'}
                </span>
                <div className="w-8 h-8 bg-primary-200 dark:bg-primary-600 rounded-full flex items-center justify-center text-primary-700 dark:text-white font-semibold font-inter">
                  {user.name?.charAt(0).toUpperCase() ?? 'U'}
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={handleAuthAction}
              className="text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-semibold rounded-lg text-xs px-3 py-1.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 font-poppins"
            >
              {auth.accessToken ? "Logout" : "Login"}
            </button>

            <button
              onClick={toggleDarkMode}
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xs px-3 py-1.5"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8.66-10H20m-16 0H3m15.36 6.64l-.7-.7M7.34 7.34l-.7-.7m12.02 12.02l-.7-.7m-12.02 0l-.7-.7M12 5a7 7 0 1 0 0 14a7 7 0 0 0 0-14z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.293 14.707A8 8 0 1 1 12 4.93v.07a8 8 0 0 0 5.293 9.707z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
