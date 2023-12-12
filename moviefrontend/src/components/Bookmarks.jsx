import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Bookmark from './Bookmark';
import './css/bookmarks.css';
import { Collapse, Button } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';

const Bookmarks = ({ userid }) => {
  const [medias, setMedias] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBookmarks(userid);
  }, [userid]);

  function fetchBookmarks(uid) {
    fetch(`http://localhost:5001/api/bookmark/${uid}`)
      .then((res) => res.json())
      .then((json) => {
        setBookmarks(json);
        if (Array.isArray(json)) {
          Promise.all(json.map((bookmark) => fetchMediaForBookmarks(bookmark)))
            .then((mediaArray) => {
              const flattenedMediaArray = mediaArray.flat();
              setMedias(flattenedMediaArray);
            })
            .catch((error) => {
              console.error('Error fetching media for bookmarks:', error);
            });
        } else {
          console.error('API response is not an array:', json);
        }
      })
      .catch((error) => {
        console.error('Error fetching bookmarks:', error);
      });
  }

  function fetchMediaForBookmarks(bookmark) {
    return fetch(`http://localhost:5001/api/media/${bookmark.m_id}`)
      .then((res) => res.json())
      .then((media) => {
        media.time = bookmark.time;
        console.log(media);
        return media;
      })
      .catch((error) => {
        console.error('Error fetching media for bookmark:', error);
      });
  }

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
        <table className="table table-bordered gray-table">
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
