import React from "react";
import { NavLink } from 'react-router-dom';
import "./css/bookmark.css";
import BookmarkButton from "./BookmarkButton";

const Bookmark = ({ media }) => {
  const bookmarkstatus = true;

  return (
    <NavLink to={`/media/${media.id}`} className="nav-link">
      <div className="bookmark">
        <img src={media.poster} alt="dælens" />
        <div className="bookmark-info">
          <h2>{media.title}</h2>
          {/* Display the bookmark time */}
          <h2>{media.year}</h2>
          {/* Add additional information here */}
          <p>{media.description}</p>
        </div>
        <div>
            Time added: {media.time}
          <BookmarkButton onBookmark={bookmarkstatus} m_id={media.id} />
        </div>
      </div>
    </NavLink>
  );
};

export default Bookmark;
