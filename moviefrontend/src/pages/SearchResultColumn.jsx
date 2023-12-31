import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import SearchResult from './SearchResult';
import Button from 'react-bootstrap/Button';
import TypeContext from '../components/TypeContext';
import {useContext} from 'react';
import UserContext from '../components/UserContext';


const SearchResultColumn = () => {
  const [search, setSearch] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const { types, setTypesList } = useContext(TypeContext);
  const { userToken } = useContext(UserContext);

  const { searchstring } = useParams();

  
  function handleFilter(types) {
     //filers need to be formatted to be
    const mediaTypes = types.join(' '); 
    return mediaTypes;
  }
  
  const loadSearch = (page) => {
    const mediaTypesString = handleFilter(types);
    const u_idd = userToken? userToken.id : "";
    

    fetch(`http://localhost:5001/api/media/search?page=${page}&pageSize=10&Type=${mediaTypesString}&search=${searchstring}&u_id=${u_idd}`)
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

  const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setIsVisible(window.scrollY > 200);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    return (
      <div className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
        &uarr; <span style={{ fontSize: '0.8em' }}>Back to top</span>
      </div>
    );
  };

  return (
    <div>
      
      <center>
        <div>
      <h2>Search results on: {searchstring} 
      {types != null && types.length <3? " - Selected types:"+types: ""}</h2></div>
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


<div>
      
      <center>
        <Button onClick={handlePrevClick} disabled={currentPage === 0}>
          Previous 
        </Button>
        <span> Page {currentPage + 1} </span>
        <Button onClick={handleNextClick}>
          Next
        </Button>
      </center>

      {/* Include the ScrollToTopButton component */}
      <ScrollToTopButton />
    </div>
      </div>  
  );
};

export default SearchResultColumn;


 
