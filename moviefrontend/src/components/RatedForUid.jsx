import React, { useEffect, useState } from 'react';
import Rating from './Rating';

const RatedForUid = ({ userid }) => {
  const [ratings, setRatings] = useState([]);
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    fetchRatings(userid);
  }, [userid]);

  function fetchRatings(uid) {
    fetch(`http://localhost:5001/api/localrating/1`)
      .then((res) => res.json())
      .then((json) => {
        setRatings(json);

        if (Array.isArray(json)) {
          Promise.all(json.map((rating) => fetchMediaForRatings(rating)))
            .then((mediaArray) => {
              const flattenedMediaArray = mediaArray.flat();
              setMedias(flattenedMediaArray);
            })
            .catch((error) => {
              console.error('Error fetching media for ratings:', error);
            });
        } else {
          console.error('API response is not an array:', json);
        }
      })
      .catch((error) => {
        console.error('Error fetching ratings:', error);
      });
  }

  function fetchMediaForRatings(rating) {
    return fetch(`http://localhost:5001/api/media/${rating.m_id}`)
      .then((res) => res.json())
      .then((media) => {
        media.rating = rating.localscore; // Change to rating if needed
        console.log(media);
        return media;
      })
      .catch((error) => {
        console.error('Error fetching media for ratings:', error);
      });
  }

  return (
    <div>
      <br />
      <br />
      <h1>Your Rated Movies</h1>
      {ratings && ratings.length > 0 ? (
        <table className="table table-bordered table-black-background">
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
    </div>
  );
};

export default RatedForUid;
