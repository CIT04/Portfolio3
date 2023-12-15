import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import Bookmark from './Bookmark';
import DataAccess from '../accessLayer/DataAccess';


// variable to hold the individual bookmark states
const Bookmarks = ({ userid }) => {
  const [medias, setMedias] = useState([]);
  const [open, setOpen] = useState(false);
  const dataAccess = new DataAccess();

  useEffect(() => {
    fetchBookmarks(userid);
  }, [userid]);


  //function that fetches bookmarks based on the given user id
  async function fetchBookmarks(uid) {
    try {
      const json = await dataAccess.fetchBookmarks(uid);
//if more than one bookmark -> array -> map them all
      if (Array.isArray(json)) {
        const mediaArray = await Promise.all(
          json.map((bookmark) => fetchMediaForBookmarks(bookmark))
        );
        const flattenedMediaArray = mediaArray.flat();
        setMedias(flattenedMediaArray);
      } else {
        console.error('API response is not an array:', json);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  }

  async function fetchMediaForBookmarks(bookmark) {
    try {
      const media = await dataAccess.fetchMediaDetails(bookmark.m_id);
      media.time = bookmark.time;
      console.log(media);
      return media;
    } catch (error) {
      console.error('Error fetching media for bookmark:', error);
    }
  }


  //jsx for showing the bookmarks, uses csstransistion get the wanted collapse effect 
  return (
    <div>
      <h2>Your Bookmarked Media</h2>
      <Button
        type="button"
        className="btn btn-warning"
        onClick={() => setOpen(!open)}
        aria-controls="bookmarksCollapse"
        aria-expanded={open}
      >
        <h2button>Click to expand or collapse</h2button>
      </Button>

      <br></br>
      <br></br>

      <CSSTransition
        in={open}
        timeout={300}
        classNames="top-to-bottom"
        unmountOnExit
      >
        <table className="table table-dark">
          <tbody className="gray-tbody">
            {medias.map((media) => (
              <tr key={media.id}>
                <td colSpan="3">
                  <Bookmark media={media} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CSSTransition>
    </div>
  );
};

export default Bookmarks;
