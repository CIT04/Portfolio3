import React from 'react';

const RatedMovies = ({ ratedMovies }) => {
    return (
      <div>
      <br></br>
      <br></br>
        <h1>Your Rated Movies</h1>
        {ratedMovies && ratedMovies.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {ratedMovies.map((movie) => (
              <li
                key={movie.id}
                style={{
                  borderBottom: '1px solid #ccc',
                  padding: '20px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '1.2em' }}>{movie.title}</strong>
                  <div style={{ fontSize: '1em', color: '#888' }}>
                    {movie.rating.toFixed(1)}/10
                  </div>
                </div>
                <div style={{ fontSize: '1.5em', paddingRight: '50px' }}>
                  {Array.from({ length: 10 }, (_, index) => (
                    <span
                      key={index}
                      style={{
                        color:
                          index < movie.rating
                            ? 'gold'
                            : index - 0.5 === movie.rating
                            ? 'gold'
                            : 'gray',
                      }}
                    >
                      {index < movie.rating
                        ? '\u2605' // Full star
                        : index - 0.5 === movie.rating
                        ? '\u00BD' // Half star
                        : '\u2606'} {/* Empty star */}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No rated movies yet.</p>
        )}
      </div>
    );
};
  
const ratedMovies = [
    
    
    
    { id: 1, title: 'Inception', rating: 5 },
   
  ];

  const RatedForUid = ({userid}) => {

  

  
    return (
      <div>
      <RatedMovies ratedMovies={ratedMovies}/>
      </div>
    );
  };

export default RatedForUid;