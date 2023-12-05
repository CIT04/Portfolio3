import React, { useState, useContext } from 'react';

import UserContext from './UserContext';

const BookmarkButton = ({ onBookmark }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { userToken, setToken } = useContext(UserContext);
  

  const handleClick = () => {
    setIsBookmarked(!isBookmarked);
    const bookmarks = {
        
            M_id: "tt0795176", // Replace with the actual media ID
            U_id: userToken.id, // Replace with the actual user ID
            Time: "2023-12-05T12:34:56", // Replace with the actual timestamp
            Annotation: "This is a sample annotation" // Replace with the actual annotation text
          
      };

    fetch('http://localhost:5001/api/bookmark/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookmarks)
    })
      .then((res) => res.json())
      .then((json) => {
        // Do something with the response if needed
        console.log(json);
      });

    onBookmark(!isBookmarked); // Pass the bookmark status to the parent component
  };

  return (
    <button onClick={handleClick} className="bookmark-button">
      {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
    </button>
  );
};

export default BookmarkButton;