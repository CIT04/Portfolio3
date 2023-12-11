import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

import UserContext from './UserContext';

const BookmarkButton = ({ m_id }) => {
  const [isBookmarked, setIsBookmarked] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const { userToken, setToken } = useContext(UserContext);

  useEffect(() => {
    // Fetch bookmark status when the component mounts
    if (userToken) {
      fetch(`http://localhost:5001/api/bookmark/${userToken.id}`)
        .then(res => res.json())
        .then(bookmarks => {
          // Check if the current media is bookmarked
          const isMediaBookmarked = bookmarks.some(bookmark => bookmark.m_id === m_id);
          setIsBookmarked(isMediaBookmarked);
        });
    } else {
      // If userToken is null, set bookmark status to false
      setIsBookmarked(false);
    }
  }, [m_id, userToken]);

  const handleClick = () => {
    if (!userToken) {
      console.log('User not logged in');
      return;
    }

    setIsBookmarked(!isBookmarked);
    setMessage(isBookmarked ? 'Bookmark Removed' : 'Bookmark Added');
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      setMessage('');
    }, 1000); 

    const bookmarks = {
      M_id: m_id,
      U_id: userToken.id,
    };

    const endpoint = isBookmarked
      ? `http://localhost:5001/api/bookmark/delete`
      : `http://localhost:5001/api/bookmark/create`;

    const method = isBookmarked ? 'DELETE' : 'POST';

    fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookmarks),
    })
      .then(res => {
        if (res.ok) {
          return res.json(); // Parse JSON if the response is OK
        } else {
          return Promise.reject(`Failed with status ${res.status}`);
        }
      })
      .catch(error => {
        // Handle errors here
        console.error('Error:', error);
      });
  };

  const handleClose = () => {
    // Close the modal and reset the message
    setShowMessage(false);
    setMessage('');
  };

  

  if (!userToken) {
    return null; // If userToken is null, do not render the button
  }

  if (isBookmarked === null) {
    return <p>Loading...</p>; // You may want to add a loading state while fetching
  }

  return (
    <>
      <button onClick={handleClick} className="bookmark-button">
        {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
      </button>

      {/* Bootstrap Modal for displaying the message */}
      <Modal show={showMessage} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bookmark Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookmarkButton;
