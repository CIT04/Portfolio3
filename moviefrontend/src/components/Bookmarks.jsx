import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Bookmark from './Bookmark';
import './css/bookmarks.css';



const Bookmarks = ({ userid }) => {
  const [medias, setMedias] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  
  useEffect(() => {
    fetchBookmarks(userid);
  }, [userid]);

  function fetchBookmarks(uid) {
    fetch(`http://localhost:5001/api/bookmark/${uid}`)
      .then((res) => res.json())
      .then((json) => {
        setBookmarks(json);

        // Check if json is an array before fetching media
        if (Array.isArray(json)) {
          // Use Promise.all to wait for all media fetches to complete
          Promise.all(json.map((bookmark) => fetchMediaForBookmarks(bookmark)))
            .then((mediaArray) => {
              // Flatten the array of media arrays
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
    <table className="table table-bordered gray-table" >
      <h2>Your bookmarks</h2>
      <thead>
        <tr>
          <th colSpan="2">Bookmarked media</th>
        </tr>
      </thead>
      <tbody className='gray-tbody'>
        {medias.map((media) => (
          <tr key={media.id}>
            <td colSpan="3">
              <Bookmark media={media} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Bookmarks;
