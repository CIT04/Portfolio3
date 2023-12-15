import React, { useEffect, useState,useContext } from 'react';
import Rating from './Rating';
import UserContext from './UserContext';
import './css/bookmarks.css';
import { Collapse, Button } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import DataAccess from '../accessLayer/DataAccess';


const RatedForUid = ({ userid }) => {
  const [ratings, setRatings] = useState([]);
  const [medias, setMedias] = useState([]);
  const { userToken } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const dataAccess = new DataAccess();


  useEffect(() => {
    fetchRatings(userid);
  }, [userid]);
  
  async function fetchRatings(uid) {
    try {
      
      const json = await dataAccess.fetchRatings(userToken.id);
     
      if (Array.isArray(json)) {
        const mediaArray = await Promise.all(
          json.map((rating) => fetchMediaForRatings(rating))
        );

        const flattenedMediaArray = mediaArray.flat();
        setMedias(flattenedMediaArray);
      } else {
        console.error('API response is not an array:', json);
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  }
  async function fetchMediaForRatings(rating) {
    try {
      const media = await dataAccess.fetchMediaDetails(rating.m_id);
      media.rating = rating.localscore; 
      console.log(media);
      return media;
    } catch (error) {
      console.error('Error fetching media for ratings:', error);
    }
  }

  return (
    <div className="rated-for-uid-container">
      <h2>Your Rated Movies</h2>
      
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => setOpen(!open)}
        aria-controls="ratingsCollapse"
        aria-expanded={open}
      >
      
        <h2button>Click to expand or collapse</h2button>
       
      </button>
      <br>
      </br>
      <br>
      </br>
      
      
      <CSSTransition
        in={open}
        timeout={300}
        classNames="top-to-bottom"
        unmountOnExit
      >
        {medias && medias.length > 0 ? (
          <table className="table table-dark striped">
            <thead>
              <tr>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {medias.map((media) => (
                <tr key={media.id}>
                  <Rating media={media} />
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No rated movies yet.</p>
        )}
        </CSSTransition>
    </div>
  );
};

export default RatedForUid;
