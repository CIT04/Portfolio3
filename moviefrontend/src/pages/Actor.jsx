// Actor.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Actor.css';

const Actor = ({ actors }) => {
  const navigate = useNavigate();

  const handleActorClick = (actorId) => {
    // Navigate to the actor's page when the name is clicked
    navigate(`/person/${actorId}`);
  };

  console.log('Actors:', actors);

  return (
    <div className="actor-page">
      <div className="actor-movies">
        <h3>Movies</h3>
        {actors && Array.isArray(actors) ? (
          actors.map((actor) => {
            console.log('Actor:', actor);
            return (
              <div key={actor && actor.p_id} className="actor-card" onClick={() => handleActorClick(actor.p_id)}>
                <h2>{actor && actor.primaryName}</h2>
                {actor && actor.primaryProfession && <p>Profession: {actor.primaryProfession}</p>}
                {actor && actor.knownForTitles && <p>Known For: {actor.knownForTitles}</p>}
              </div>
            );
          })
        ) : (
          <p>No actors available.</p>
        )}
      </div>
    </div>
  );
};


export default Actor;
