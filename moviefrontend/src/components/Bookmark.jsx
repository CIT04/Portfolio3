import React from "react";
import { NavLink } from 'react-router-dom';
import "./css/bookmark.css";  
import BookmarkButton from "./BookmarkButton";  
import { renderImage } from "./imageUtil";
import { Collapse } from 'react-bootstrap';  

// Function to format the date in a user-friendly way
const formatDate = (time) => {
  const bookmarkDate = new Date(time);
  // Returning the formatted date in the 'dd/mm/yyyy' format
  return bookmarkDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
};

// Functional component for a bookmark item
const Bookmark = ({ media }) => {

  // A boolean variable indicating the bookmark status (set to true for now)
  const bookmarkstatus = true;
  
  // JSX code for rendering a bookmark item
  return (
    <div className="bookmark-container">
      {/* Using NavLink for navigation to a media page */}
      <NavLink to={`/media/${media.id}`} className="nav-link">
        {/* The main bookmark container */}
        <div className="bookmark">
          {/* Rendering the media poster using a helper function */}
          {renderImage(media.poster, media.title)}

          {/* Information section for the bookmark */}
          <div className="bookmark-info">
            {/* Displaying the media title */}
            <h2>{media.title}</h2>
            {/* Displaying the media year */}
            <h2>{media.year}</h2>
            {/* Displaying additional information (description) */}
            <p>{media.description}</p>
          </div>

          {/* Displaying the date the bookmark was added */}
          <div className="date-added">Date added: {formatDate(media.time)}</div>
        </div>
      </NavLink>
      <div>
        <BookmarkButton onBookmark={bookmarkstatus} m_id={media.id} />
      </div>
    </div>
  );
};

// Exporting the Bookmark component as the default export
export default Bookmark;
