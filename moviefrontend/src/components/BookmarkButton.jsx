import React, { useState, useContext, useEffect } from 'react';

import UserContext from './UserContext';

const BookmarkButton = ({ m_id }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { userToken, setToken } = useContext(UserContext);


  useEffect(() => {
    // Fetch bookmark status when the component mounts
    fetch(`http://localhost:5001/api/bookmark/${userToken.id}`)
      .then(res => res.json())
      .then(bookmarks => {
        // Check if the current media is bookmarked
        const isMediaBookmarked = bookmarks.some(bookmark => bookmark.m_id === m_id);
        setIsBookmarked(isMediaBookmarked);
      });
  }, [m_id, userToken.id]);



  const handleClick = () => {
    setIsBookmarked(!isBookmarked);
    const bookmarks = {

      M_id: m_id,
      U_id: userToken.id,
    };


    const endpoint = isBookmarked
      ? `http://localhost:5001/api/bookmark/remove`
      : `http://localhost:5001/api/bookmark/create`;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookmarks),
    })
      .then((res) => res.json())
      .then((json) => {
        // Do something with the response if needed
        console.log(json);
      });

 
  };

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
