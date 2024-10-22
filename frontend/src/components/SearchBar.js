// src/components/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm); // Call the parent component's search function
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Trigger search on pressing Enter
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress} // Enables search on Enter key
        />
        <button
          className="search-button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

