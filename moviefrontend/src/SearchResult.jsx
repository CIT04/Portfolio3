// SearchResult.js
import React from 'react';

const SearchResult = ({ poster, title, year, rating }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '5px', display: 'flex' }}>
      <img src={poster} alt={title} style={{ maxWidth: '100px', maxHeight: '150px', marginRight: '10px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', textAlign:'left'}}>
        <h2>{title}</h2>
        <p>Year: {year}</p>
        <p>Rating: {rating}</p>
      </div>
    </div>
  );
};

export default SearchResult;
