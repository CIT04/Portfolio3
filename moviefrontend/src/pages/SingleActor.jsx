// SingleActor.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/SingleActor.css'; // Import the CSS file


const SingleActor = () => {
  const { actorId } = useParams();
  const [actorDetails, setActorDetails] = useState(null);

  useEffect(() => {
    // Fetch actor details based on actorId
    fetch('http://localhost:5001/api/person/'+actorId)
      .then((res) => res.json())
      .then((json) => {
        
        // Set the actor details in the state
        setActorDetails(json);
        console.log(actorId)
      })
      .catch((error) => {
        console.error('Error fetching actor details:', error);
      });
  }, [actorId]);

  // Render actor details
  return (
    <div className="actor-details">
      <h1>Actor Details</h1>
      <p>Actor ID: {actorId}</p>
      {console.log(actorId)}
      {actorDetails === null ? (
        ''
      ) : (
        <div className="actor-card">
          <h2>{actorDetails.primaryName}</h2>
          {actorDetails.primaryProfession && <p>Profession: {actorDetails.primaryProfession}</p>}
          {actorDetails.knownForTitles && <p>Known For: {actorDetails.knownForTitles}</p>}
        </div>
      )}
      {/* Add more details as needed */}
    </div>
  );
};

export default SingleActor;
