import React from 'react';
import './css/Actor.css';

const Actor = ({ actors }) => {
  return (
    <div className="actor-page">
    <div className="actor-movies">
      <h3>Movies</h3>
      {actors && Array.isArray(actors) ? (
        actors.map((actor) => (
          <div key={actor && actor.p_id} className="actor-card">
            <h2>{actor && actor.primaryName}</h2>
            {actor && actor.knownForTitles && (
              <p>{actor.knownForTitles}</p>
            )}
          </div>
        ))
        ) : (
            <p>No actors available.</p>
          )}
        </div>
      </div>
    );
  };

export default Actor;
