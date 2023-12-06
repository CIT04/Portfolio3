import React, { useState, useEffect } from 'react';
import './css/Team.css';
import { useParams } from 'react-router-dom';

const Team = () => {
  const [actors, setActors] = useState([]);
  const [crew, setCrew] = useState([]);
  const [wandd, setWandd] = useState([]);
  const { mediaId } = useParams();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/media/team/${mediaId}`);
        const json = await response.json();

        setActors(json.actor || []);
        setCrew(json.crew || []);
        setWandd(json.writersAndDirectors || []);
      } catch (error) {
        console.error('Error fetching team data', error);
      }
    };

    fetchTeam();
  }, [mediaId]);

  if (actors.length === 0 && crew.length === 0 && wandd.length === 0) {
    return (
      <div className="containerteam">
        <center>
          <h1 className="h1teams">MOVIE TITLE HERE</h1>
        </center>
        <br />
        <div>No data available</div>
      </div>
    );
  }

  return (
    <div className="containerteam">
      <center>
        <h1 className="h1teams">MOVIE TITLE HERE</h1>
      </center>
      <br />

      {/* Cast List */}
      {actors.length > 0 && (
        <div className="cast-listteam">
          <h2 className="h2teams">Cast</h2>
          <ul className="ulteam">
            {actors.map((actor, index) => (
              <li className="liteam" key={index}>
                <span className="person-name">{actor.person.name}</span>
                <span className="role">{actor.role || 'N/A'}</span>
                {actor.character && Array.isArray(actor.character) && (
                  <span className="character">Character(s): {actor.character.join(', ')}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Writers and Directors List */}
      {wandd.length > 0 && (
        <div className="crew-listteam">
          <h2 className="h2teams">Writers and Directors</h2>
          <ul className="ulteam">
            {wandd.map((writersAndDirectors, index) => (
              <li className="liteam" key={index}>
                <span className="person-name">{writersAndDirectors.person.name}</span>
                <span className="role">{writersAndDirectors.role || 'N/A'}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Crew List */}
      {crew.length > 0 && (
        <div className="crew-listteam">
          <h2 className="h2teams">Crew</h2>
          <ul className="ulteam">
            {crew.map((crewMember, index) => (
              <li className="liteam" key={index}>
                <span className="person-name">{crewMember.person.name}</span>
                <span className="role">{crewMember.role || 'N/A'}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Team;