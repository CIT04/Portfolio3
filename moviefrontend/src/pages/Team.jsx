import React, { useState, useEffect } from 'react';
import './css/Team.css'; 

const Team = () => {
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  useEffect(() => {
    const fetchRandomUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();

    
        const users = data.results || [];
        const castNames = users.map(user => `${user.name.first} ${user.name.last}`);
        const crewNames = users.map((user, index) => `${user.name.first} ${user.name.last}`);

        setCast(castNames);
        setCrew(crewNames);
      } catch (error) {
        console.error('Error fetching random users', error);
      }
    };

    fetchRandomUsers();
  }, []);

  if (cast.length === 0 && crew.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className='h1teams'>Full Cast and Crew</h1>
      <div className="cast-list">
        <h2 className='h2teams'>Cast</h2>
        <ul className='ulteam'>
          {cast.map((actor, index) => (
            <li className='liteam' key={index}>{actor}</li>

          ))}
        </ul>
      </div>
      <div className="crew-list">
        <h2 className='h2teams'>Crew</h2>
        <ul className='ulteam'>
          {crew.map((crewMember) => (
            <li className='liteam' >{crewMember}</li>

          ))}
        </ul>
      </div>
    </div>
  );
};

export default Team;
