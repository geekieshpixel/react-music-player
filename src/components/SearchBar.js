import React from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
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
       <FontAwesomeIcon icon={faMagnifyingGlass} className="input-icon" />
    </div>
  );
};

export default SearchBar;
