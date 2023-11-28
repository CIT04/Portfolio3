// SearchResult.js
import React from 'react';
import './css/SearchResult.css';


const SearchResult = ({ poster, title, year, rating }) => {
  return (
    <div className="search-result">
      <img src={poster} alt={'Image not found'} />
      <div className="search-result-text">
        <h2>{title}</h2>
        <p>Year: {year}</p>
        <p>Rating: {rating}</p>
      </div>
    </div>
  );
};

export default SearchResult;
