import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/SingleActor.css'; // Import the CSS file
import { NavLink } from 'react-router-dom';

const SingleActor = () => {
  const { actorId } = useParams();
  const [actorDetails, setActorDetails] = useState(null);
  const [knownForMediaDetails, setKnownForMediaDetails] = useState([]);

  useEffect(() => {
    // Fetch actor details based on actorId
    fetch(`http://localhost:5001/api/person/${actorId}`)
      .then((res) => {
        // Handle not found response
        if (res.status === 404) {
          throw new Error('Not Found');
        }
        return res.json();
      })
      .then((json) => {
        // Set the actor details in the state
        setActorDetails(json);
      })
      .catch((error) => {
        console.error('Error fetching actor details:', error);
      });
  }, [actorId]);

  useEffect(() => {
    // Fetch media details for each known media
    Promise.all(
      actorDetails?.knownForTitles?.split(',').map((knownForMediaId) =>
        fetch(`http://localhost:5001/api/media/${knownForMediaId}`)
          .then((res) => {
            if (res.status === 404) {
              // Return null for 404 responses
              return null;
            }
            return res.json();
          })
      ) ?? []
    )
      .then((mediaDetailsArray) => {
        // Filter out null values (404 responses)
        const validMediaDetails = mediaDetailsArray.filter((media) => media !== null);
        // Set the media details in the state
        setKnownForMediaDetails(validMediaDetails);
      })
      .catch((error) => {
        console.error('Error fetching media details:', error);
      });
  }, [actorDetails]);

  // Render actor details
  return (
    <div className="actor-details">
      <h1>Actor Details</h1>
      <p>Actor ID: {actorId}</p>
      {actorDetails === null ? (
        ''
      ) : (
        <div className="actor-card2" >
          <h2>{actorDetails.primaryName}</h2>
          {actorDetails.primaryProfession && <p>Profession: {actorDetails.primaryProfession}</p>}
          {knownForMediaDetails.length > 0 && (
            <p>
              Known For:{' '}
              {knownForMediaDetails.map((media) => (
        <liactor2 key={media.id}>
          <h4>{media.title}</h4>
          <NavLink to={`/media/${media.id}`}>
              <img src={media.poster} alt={media.title} />
            </NavLink>
          {media.year && <p>Year: {media.year}</p>}
        </liactor2>

              ))}
            </p>
          )}
        </div>
      )}
      {/* Add more details as needed */}
    </div>
  );
};

export default SingleActor;
