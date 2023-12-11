import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import UserContext from './UserContext';

const RatingComponent = ({ m_id }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const { userToken } = useContext(UserContext);
  const [rating, setRating] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5001/api/rating/${m_id}`)
      .then((res) => res.json())
      .then((json) => {
        setRating(json);
        setUserRating(json.localRating); // Set initial localRating value
      });
  }, [m_id]);

  useEffect(() => {
    // Hide the message after a delay
    const timeout = setTimeout(() => {
      setShowMessage(false);
      setMessage('');
    }, 1000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [showMessage]);

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
    })
      .then((res) => {
        if (res.ok) {
          setMessage('Rating Added');
        } else {
          setMessage('Failed to add rating');
        }
        setShowMessage(true);
        return res.json();
      })
      .then((json) => {
        // Optionally, update the state
        setRating((prevRating) => ({ ...prevRating, localRating: userRating }));
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error);
      });
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
    })
      .then((res) => {
        if (res.ok) {
          setMessage('Rating Deleted');
        } else {
          setMessage('Failed to delete rating');
        }
        setShowMessage(true);
        return res.json();
      })
      .then((json) => {
        // Optionally, update the state
        setRating((prevRating) => ({ ...prevRating, localRating: null }));
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
    // Optionally, you can call handleSaveRating here to save the rating immediately
  };
  

  const handleCloseMessage = () => {
    setShowMessage(false);
    setMessage('');
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
      {/* Bootstrap Modal for displaying the message */}
      <Modal show={showMessage} onHide={handleCloseMessage}>
        <Modal.Header closeButton>
          <Modal.Title>Rating Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
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
