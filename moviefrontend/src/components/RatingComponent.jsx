import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import UserContext from './UserContext';
import DataAccess from '../accessLayer/DataAccess';

const RatingComponent = ({ m_id }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const { userToken } = useContext(UserContext);
  const formattedM_id = m_id.length === 10 ? m_id : m_id.padEnd(10);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [hasRated, setHasRated] = useState(false);
  const dataAccess = new DataAccess();
  const [reloadKey, setReloadKey] = useState(0);

  const handleReload = () => {
    //rerender component
    setReloadKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const json = await dataAccess.fetchRatingsForMedia(userToken.id, m_id);
        setUserRating(json);
        json && setHasRated(true);
        console.log(formattedM_id);
      } catch (error) {
        console.error('Error fetching user rating:', error);
      }
    };

    fetchUserRating();
  }, [userToken.id, m_id]);
  
  useEffect(() => {

    const timeout = setTimeout(() => {
      setShowMessage(false);
      setMessage('');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [showMessage]);

  const handleSaveRating = async () => {
    try {
      const response = await dataAccess.saveLocalRating(userToken.id, formattedM_id, hasRated, userRating);
      handleReload();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleDeleteRating = () => {
    dataAccess.deleteLocalRating(userToken.id, m_id)
      .then((response) => {
        if (response.ok) {
          setMessage('Rating Deleted');
          // Trigger a re-render or perform other actions
          setReloadKey((prevKey) => prevKey + 1);
        } else {
          setMessage('Failed to delete rating');
        }
        setShowMessage(true);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error);
      });
  };
  

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarClick = () => {
    setUserRating(hoverRating);
    
  };
  

  const handleCloseMessage = () => {
    setShowMessage(false);
    setMessage('');
  };
  



  return (
    <div key={hasRated} className="rating-component">
      <h2>Your rating</h2>
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
      {hasRated ? (
        <div>
          <button
            variant="primary"
            className="bookmark-button"
            onClick={handleSaveRating}
          >
            Update Rating
          </button>
          <button
            variant="danger"
            className="bookmark-button"
            onClick={handleDeleteRating}
          >
            Delete Rating
          </button>
        </div>
      ) : (
        <div>
          <button
            variant="primary"
            className="bookmark-button"
            onClick={handleSaveRating}
          >
            Save Rating
          </button>
        </div>
      )}
      {/* Bootstrap Modal for displaying the message */}
      <Modal show={showMessage} onHide={handleCloseMessage}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }}>Bookmark Status</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: 'black' }}>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMessage}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};  

export default RatingComponent;