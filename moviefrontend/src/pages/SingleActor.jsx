import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/SingleActor.css';
import { NavLink } from 'react-router-dom';

const SingleActor = () => {
  const { actorId } = useParams();
  const [actorDetails, setActorDetails] = useState(null);
  const [knownForMediaDetails, setKnownForMediaDetails] = useState([]);


  //TODO: Move to DataAccess.jsx
  useEffect(() => {
    // Fetch actor details based on actorId
    fetch(`http://localhost:5001/api/person/${actorId}`)
      .then((res) => {
        if (res.status === 404) {
          throw new Error('Not Found');
        }
        return res.json();
      })
      .then((json) => {
        setActorDetails(json);
      })
      .catch((error) => {
        console.error('Error fetching actor details:', error);
      });
  }, [actorId]);



  //TODO: Move to DataAccess.jsx
  useEffect(() => {
    // Fetch media details for each known media
    Promise.all(
      actorDetails?.knownForTitles?.split(',').map((knownForMediaId) =>
        fetch(`http://localhost:5001/api/media/${knownForMediaId}`)
          .then((res) => {
            if (res.status === 404) {
              return null;
            }
            return res.json();
          })
      ) ?? []
    )
    //validate media details
      .then((mediaDetailsArray) => {
        const validMediaDetails = mediaDetailsArray.filter((media) => media !== null);
        setKnownForMediaDetails(validMediaDetails);
      })
      .catch((error) => {
        console.error('Error fetching media details:', error);
      });
  }, [actorDetails]);

  return (
    <div className="actor-details">
      {actorDetails === null ? (
        ''
      ) : (
        <div className="actor-card">
          <header>
            <h1 className="actor-name">{actorDetails.primaryName}</h1>
            {actorDetails.primaryProfession && (
              <p className="profession">Profession: {actorDetails.primaryProfession}</p>
            )}
          </header>
          {knownForMediaDetails.length > 0 && (
            <div className="known-for">
              <h2>Known For</h2>
              <div className="media-grid">
                {knownForMediaDetails.map((media) => (
                  <div className="media-card" key={media.id}>
                    <NavLink to={`/media/${media.id}`}>
                      <img src={media.poster} alt={media.title} />
                    </NavLink>
                    <h3>{media.title}</h3>
                    {media.year && <p className="year">Year: {media.year}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleActor;