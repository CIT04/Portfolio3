import React from "react";
import { NavLink } from 'react-router-dom';
import "./css/bookmark.css";
import BookmarkButton from "./BookmarkButton";

const formatDate = (time) => {
    const bookmarkDate = new Date(time);
    return bookmarkDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
  };

const Bookmark = ({ media }) => {
  const bookmarkstatus = true;
  console.log(media.poster);
  return (
    <NavLink to={`/media/${media.id}`} className="nav-link">
      <div className="bookmark">
      {media.poster !== "N/A" ? (
          <img src={media.poster} alt={media.title} />
        ) : (
          <img src={process.env.PUBLIC_URL + '/noimage.jpg'} alt="No Image" />
        )}

        <div className="bookmark-info">
          <h2>{media.title}</h2>
          {/* Display the bookmark time */}
          <h2>{media.year}</h2>
          {/* Add additional information here */}
          <p>{media.description}</p>
        </div>
        <div> Date added: {formatDate(media.time)}</div> 
        <div>
            
          <BookmarkButton onBookmark={bookmarkstatus} m_id={media.id} />
        </div>
      </div>
    </NavLink>
  );
};

export default Bookmark;
