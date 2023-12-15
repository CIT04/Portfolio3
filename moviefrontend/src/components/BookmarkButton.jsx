import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import UserContext from './UserContext';
import DataAccess from '../accessLayer/DataAccess';

//creating bookmark button variable to hold states
const BookmarkButton = ({ m_id }) => {
  const [isBookmarked, setIsBookmarked] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const { userToken, setToken } = useContext(UserContext);
  const dataAccess = new DataAccess();


  //update bookmark status based on user id and media id
  useEffect(() => {
    const fetchBookmarkStatus = async (userId, mediaId, setIsBookmarked) => {
      try {
        if (userId) {
          const bookmarks = await dataAccess.fetchBookmarks(userId);
          const isMediaBookmarked = bookmarks.some(bookmark => bookmark.m_id === mediaId);
          setIsBookmarked(isMediaBookmarked);
        } else {
          setIsBookmarked(false);
        }
      } catch (error) {
        console.error('Error fetching bookmark status', error);
      }
    };
  
    fetchBookmarkStatus(userToken?.id, m_id, setIsBookmarked);
  
  
  }, [m_id, userToken]);

  const handleClick = async () => {
    if (!userToken) {
      console.log('User not logged in');
      return;
    }
  //set msg based on bookmark already added or not, then create bookmark
    try {
      setIsBookmarked(!isBookmarked);
      setMessage(isBookmarked ? 'Bookmark Removed' : 'Bookmark Added');
      setShowMessage(true);
  
      setTimeout(() => {
        setShowMessage(false);
        setMessage('');
      }, 1000);
  
      if (isBookmarked) {
        await dataAccess.deleteBookmark(m_id, userToken.id);
      } else {
        await dataAccess.createBookmark(m_id, userToken.id);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
    };
  };


  //close error msg
  const handleClose = () => {
    setShowMessage(false);
    setMessage('');
  };

  if (!userToken) {
    return null; // If userToken is null, do not render the button
  }

  if (isBookmarked === null) {
    return <p>Loading...</p>; 
  }


  //render jsx component
  return (
    <>
      <button onClick={handleClick} className="bookmark-button">
        {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
      </button>

      {/* Bootstrap to display the message */}
      <Modal show={showMessage} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title style={{ color: 'black' }}>Bookmark Status</Modal.Title>
  </Modal.Header>
  <Modal.Body style={{ color: 'black' }}>{message}</Modal.Body>
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
