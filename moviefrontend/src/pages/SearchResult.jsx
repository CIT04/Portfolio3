
import React from 'react';
import './css/SearchResult.css';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';


//Generic component for a searchresault
const SearchResult = ({mediaid, poster, title, year, rating  }) => {
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
