import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import UserContext from './UserContext';

const RatingComponent = ({ m_id }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const { userToken } = useContext(UserContext);

  const handleSaveRating = () => {
   
    fetch('http://localhost:5001/api/localrating/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        M_id: m_id,
        U_id: userToken.id,
        LocalScore: userRating,
      }),
    })

   
  };

  const handleDeleteRating = () => {
    

   
    fetch('http://localhost:5001/api/localrating/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        M_id: m_id,
        U_id: userToken.id,
      }),
    })

    
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarClick = () => {
    setUserRating(hoverRating);
    // Optionally, you can call handleSaveRating here to save the rating immediately
  };

  return (
    <div className="rating-component">
      <div className="star-rating">
        {[...Array(10)].map((_, index) => (
          <span
            key={index}
            className="star"
            style={{
              fontSize: '1.5em',
              color: index < (hoverRating || userRating) ? 'gold' : 'gray',
            }}
            onMouseEnter={() => handleStarHover(index + 1)}
            onMouseLeave={() => handleStarHover(0)}
            onClick={handleStarClick}
          >
            {index < (hoverRating || userRating) ? '\u2605' : '\u2606'}
          </span>
        ))}
      </div>
      {userToken&&<div>
      <button variant="primary" className="bookmark-button" onClick={handleSaveRating}>
        Save Rating
      </button>
      <button variant="danger" className="bookmark-button" onClick={handleDeleteRating}>
        Delete Rating
      </button>
      </div>}
    </div>
  );
};

export default RatingComponent;
