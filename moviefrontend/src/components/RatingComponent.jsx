import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import UserContext from './UserContext';

const RatingComponent = ({ m_id }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const { userToken } = useContext(UserContext);

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [hasRated, setHasRated] = useState(false);
 
  useEffect(() => {
    
  fetch(`http://localhost:5001/api/localrating/${userToken.id}/${m_id}`)
        .then((res) => res.json())
        .then((json) => {
          setUserRating(json);
          json && setHasRated(true);
          console.log(json)
        });
    }, [userToken.id, m_id]);

  
  useEffect(() => {

    const timeout = setTimeout(() => {
      setShowMessage(false);
      setMessage('');
    }, 1000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [showMessage]);

  const handleSaveRating = () => {
    const apiUrl = hasRated
      ? 'http://localhost:5001/api/localrating/update'
      : 'http://localhost:5001/api/localrating/create';

    const method = hasRated ? 'PUT' : 'POST';

    fetch(apiUrl, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        M_id: m_id.trim(),
        U_id: userToken.id,
        LocalScore: userRating,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setMessage(hasRated ? 'Rating Updated' : 'Rating Added');
        } else {
          setMessage(hasRated ? 'Failed to update rating' : 'Failed to add rating');
        }
        setShowMessage(true);
        return res.json();
      })

      .then((json) => {
        setUserRating((prevRating) => ({ ...prevRating, localRating: userRating }));
        setHasRated(true);
      })


      .catch((error) => {
        console.error('Error:', error);
      });
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
      .then((res) => {
        if (res.ok) {
          setMessage('Rating Deleted');
        } else {
          setMessage('Failed to delete rating');
        }
        setShowMessage(true);
        return res.json();
      })
      
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error);
      });
  };

  const handleUpdateRating = () => {
    fetch('http://localhost:5001/api/localrating/update', {
   
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({
        M_id: m_id.trim(),
        U_id: userToken.id,
        LocalScore: userRating,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setMessage('Rating Updated');
        } else {
          setMessage('Failed to update rating');
        }
        setShowMessage(true);
        return res.json();
      })
      .then((json) => {
        setUserRating((prevRating) => ({ ...prevRating, localRating: userRating }));

      })
      .catch((error) => {
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
            onClick={handleUpdateRating}
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