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

        setActors(json.actor);
        setCrew(json.crew);
        setWandd(json.writersAndDirectors);

      } catch (error) {
        console.error('Error fetching team data', error);
      }
    };

    fetchTeam();
  }, []);

  if (actors.length === 0) {
    return <div>Loading...</div>;
  }

  return (    
    <div className="containerteam">
      <h1 className='h1teams'>Full Cast and Crew</h1>
      <div className="cast-listteam">
        <h2 className='h2teams'>Cast</h2>
        <ul className='ulteam'>
          {actors.map((actor, index) => (
            <li className='liteam' key={index}>{actor.person.name}</li>
          ))}
        </ul>
      </div>
      <div className="crew-listteam">
        <h2 className='h2teams'>Writers and Directors</h2>
        <ul className='ulteam'>
          {wandd.map((writersAndDirectors, index) => (
          <li className='liteam' key={index}>{writersAndDirectors.person.name}</li>
          ))}
        </ul>
        </div>
      <div className="crew-listteam">
        <h2 className='h2teams'>Crew</h2>
        <ul className='ulteam'>
          {crew.map((crew, index) => (
          <li className='liteam' key={index}>{crew.person.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Team;
