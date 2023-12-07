import React, { useState, useContext, useEffect } from 'react';

import UserContext from './UserContext';

const BookmarkButton = ({ m_id }) => {
  const [isBookmarked, setIsBookmarked] = useState(null);
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
      // Handle the case where userToken is null (e.g., show a login prompt)
      // You can customize this part based on your application logic
      console.log('User not logged in');
      return;
    }

    setIsBookmarked(!isBookmarked);
    const bookmarks = {
      M_id: m_id,
      U_id: userToken.id,
    };

    const endpoint = isBookmarked
      ? `http://localhost:5001/api/bookmark/delete`
      : `http://localhost:5001/api/bookmark/create`;

    const method = isBookmarked? 'DELETE' : 'POST';

    fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookmarks),
    })
    .then((res) => {
        if (res.ok) {
          return res.json(); // Parse JSON if the response is OK
        } else {
          return Promise.reject(`Failed with status ${res.status}`);
        }
      })
      .then((json) => {
        // Do something with the response if needed
        console.log(json);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error);
      });

    
  };

  if (!userToken) {
    return null; // If userToken is null, do not render the button
  }

  if (isBookmarked === null) {
    return <p>Loading...</p>; // You may want to add a loading state while fetching
  }

  return (
    <button onClick={handleClick} className="bookmark-button">
      {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
    </button>
  );
};

export default BookmarkButton;
