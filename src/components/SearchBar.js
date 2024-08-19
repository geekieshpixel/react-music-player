import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Search Song, Artist"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
