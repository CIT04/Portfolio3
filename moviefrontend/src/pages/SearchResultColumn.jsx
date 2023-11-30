import React from 'react';
import SearchResult from './SearchResult';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';


const SearchResultColumn = () => {
  const [search, setSearch] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const { searchstring } = useParams();

  const loadSearch = () => {
    fetch(`http://localhost:5001/api/media/search?page=0&pageSize=10&Type=movie&search=${searchstring}`)
      .then((res) => res.json())
      .then((json) => {
        console.log('Search API response:', json);
        setSearch(json.items);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  };

  useEffect(loadSearch, [searchstring]);

  return (
    <div>
      {search.length === 0 ? (
        <p>No movies with those search terms</p>
      ) : (
        search.map((result) => (
          <NavLink to={"/media/"+result.id} className="nav-link" key={result.id}>
          <center>
            <SearchResult
              mediaid={result.id}
              poster={result.poster}
              title={result.title}
              year={result.year}
              rating={result.rating}
            />
          </center>
          </NavLink>
        ))
      )}
    </div>
  );
  
};

export default SearchResultColumn;
