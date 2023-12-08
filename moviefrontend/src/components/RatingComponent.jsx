import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import UserContext from './UserContext';

const RatingComponent = ({ m_id }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const { userToken } = useContext(UserContext);
  const [rating, setRating] = useState();

  useEffect(() => {
    fetch("http://localhost:5001/api/rating/" + m_id)
      .then((res) => res.json())
      .then((json) => {
        setRating(json);
        setUserRating(json.localRating); // Set initial localRating value
      });
  }, [m_id]);

  const handleSaveRating = () => {
    // Save the rating to the server and update the local state
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
    });

    // Optionally, update the state
    setRating((prevRating) => ({ ...prevRating, localRating: userRating }));
  };

  const handleDeleteRating = () => {
    // Delete the rating from the server and update the local state
    fetch('http://localhost:5001/api/localrating/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        M_id: m_id,
        U_id: userToken.id,
      }),
    });

    // Optionally, update the state
    setRating((prevRating) => ({ ...prevRating, localRating: null }));
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
      {userToken && (
        <div>
          <button
            variant="primary"
            className="bookmark-button"
            onClick={handleSaveRating}
          >
            Save Rating
          </button>
          <button
            variant="danger"
            className="bookmark-button"
            onClick={handleDeleteRating}
          >
            Delete Rating
          </button>
        </div>
      )}
    </div>
  );
};

export default RatingComponent;
