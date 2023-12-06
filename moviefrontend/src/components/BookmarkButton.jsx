import React, { useState, useContext } from 'react';

import UserContext from './UserContext';

const BookmarkButton = ({ onBookmark, m_id }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { userToken, setToken } = useContext(UserContext);
  
  // function determaineStatus(m_id,u_id){
  //   fetch("http://localhost:5001/api/bookmark/"+mediaId)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setMedia({status: 'done', ...json})
  //       setMediaLanguages(json.mediaLanguages)
  //       setMediaCountry(json.mediaCountries)
        
  // }

  const handleClick = () => {
    setIsBookmarked(!isBookmarked);
    const bookmarks = {
        
            M_id: m_id, // Replace with the actual media ID
            U_id: userToken.id, // Replace with the actual user ID
           
          
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