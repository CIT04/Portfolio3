// SearchResultColumn.js
import React from 'react';
import SearchResult from './SearchResult';

const SearchResultColumn = ({ searchResults }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
      {searchResults.map((result, index) => (
        <SearchResult
          key={index}
          poster={result.poster}
          title={result.title}
          year={result.year}  
          rating={result.rating} 
        />
      ))}
    </div>
  );
};

export default SearchResultColumn;
