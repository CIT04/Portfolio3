  import React from "react";
  import { NavLink } from 'react-router-dom';
  import "./css/bookmark.css";
  import BookmarkButton from "./BookmarkButton";
  import { renderImage } from "./imageUtil";
  import { Collapse } from 'react-bootstrap';

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
      <div className="bookmark-container">
      <NavLink to={`/media/${media.id}`} className="nav-link">
        <div className="bookmark">
          {renderImage(media.poster, media.title)}

          <div className="bookmark-info">
            <h2>{media.title}</h2>
            {/* Display the bookmark time */}
            <h2>{media.year}</h2>
            {/* Add additional information here */}
            <p>{media.description}</p>
          </div>

          <div className="date-added">Date added: {formatDate(media.time)}</div>
        </div>
      </NavLink>
      <div>
        <BookmarkButton onBookmark={bookmarkstatus} m_id={media.id} />
      </div>
    </div>
  );
  };

  export default Bookmark;
