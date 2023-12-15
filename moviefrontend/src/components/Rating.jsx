import React from "react";
import { NavLink } from 'react-router-dom';
import "./css/bookmarks.css";
import BookmarkButton from "./BookmarkButton";
import { renderImage } from "./imageUtil";
import RatingComponent from "./RatingComponent";



const Rating = ({ media }) => {
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
        
       
      </div>
    </NavLink>
        <div>
            {/*TODO add rating thing instead*/ }
          <RatingComponent m_id={media.id} />
        </div>
    </div>
  );
};

export default Rating;
