// SearchResultColumn.js
import React from 'react';
import SearchResult from './SearchResult';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';







const SearchResultColumn = ({  }) => {
const [search, setSearch] = useState([]);
const [searchInput, setSearchInput] = useState('');
const handleSearchInputChange = (value) => {
  setSearchInput(value);
};
const handleSearchSubmit = (searchInput) => {
  console.log('Search submitted:', searchInput);
};

const {searchstring} = useParams()


function loadSearch() {
  fetch(`http://localhost:5001/api/media/search?page=0&pageSize=10&Type=movie&search=${searchstring}`)
    .then((res) => res.json())
    .then((json) => {
      console.log('Search API response:', json);
      setSearch(json.items);
    })
    .catch((error) => {
      console.error('Error fetching search results:', error);
    });
}
useEffect(loadSearch, [searchstring]);



  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {search.map((result) => (
        <SearchResult
          mediaid={result.id}
          key={result.index}
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
