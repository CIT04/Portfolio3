import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import SearchResult from './SearchResult';
import Button from 'react-bootstrap/Button';

const SearchResultColumn = () => {
  const [search, setSearch] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const { searchstring } = useParams();

  const loadSearch = (page) => {
    fetch(`http://localhost:5001/api/media/search?page=${page}&pageSize=10&Type=movie&search=${searchstring}`)
      .then((res) => res.json())
      .then((json) => {
        console.log('Search API response:', json);
        setSearch(json.items);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  };

  useEffect(() => {
    loadSearch(currentPage);
  }, [currentPage, searchstring]);

  const handlePrevClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      
      <center>
      <h2>Search results on: {searchstring}</h2>
        <Button onClick={handlePrevClick} disabled={currentPage === 0}>
          Previous 
        </Button>
        <span> Page {currentPage + 1} </span>
        <Button onClick={handleNextClick}>
          Next
        </Button>
      </center>
      {search.length === 0 ? (
        <p>No movies with those search terms</p>
      ) : (
        search.map((result) => (
          <NavLink to={`/media/${result.id}`} className="nav-link" key={result.id}>
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
