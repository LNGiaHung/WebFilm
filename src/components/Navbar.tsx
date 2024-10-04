import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Images: string[]; // Image is an array of strings (URLs)
}

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim()) {
        try {
          const response = await fetch(`http://localhost:2000/api/movies/search?query=${searchTerm}`);
          const data = await response.json();
          setSuggestions(data.movies || []);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceFetch = setTimeout(fetchSuggestions, 300); // Debounce for 300ms

    return () => clearTimeout(debounceFetch); // Cleanup on unmount
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropdown(!!e.target.value); // Show dropdown if there's input
  };

  const handleSuggestionClick = (movie: Movie) => {
    window.location.href = `/details/${movie.imdbID}`;
  };

  return (
    <header className="bg-black bg-opacity-90 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/">
          <img
            src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
            alt="Logo"
            className="h-8"
          />
        </Link>
        <div className="relative flex-grow max-w-lg"> {/* Adjust the max width here */}
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleInputChange}
            className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 w-full" // Make the input full width
          />
          {/* Update the FaSearch icon to have a white color */}
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute z-10 bg-gray-800 rounded-md mt-1 w-full"> {/* Ensure dropdown is full width */}
              {suggestions.map((movie) => (
                <div
                  key={movie.imdbID}
                  className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleSuggestionClick(movie)}
                >
                  <img 
                    src={(movie.Images && movie.Images.length > 0) ? movie.Images[0] : 'fallback-image-url.jpg'} 
                    alt={movie.Title} 
                    className="h-10 w-10 object-cover rounded mr-2"  // Set fixed height and width
                  />
                  <span className="text-white">{movie.Title} ({movie.Year})</span>
                </div>
              ))}
              {suggestions.length === 0 && (
                <div className="p-2 text-gray-400">No results found</div>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {/* Update the FaUser and FaBell icons to have a white color */}
          <Link to="/Login"><FaUser className="text-2xl text-white" /></Link>
          <FaBell className="text-2xl text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
