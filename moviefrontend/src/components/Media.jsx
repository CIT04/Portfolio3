// MovieCard.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MovieCard = ({ poster, title, year, plot }) => {
  return (
    <div className="card">
    <Card style={{width:'18rem'}}/>
      <img src={poster} className="card-img-top col-md-4 mb-3" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{year}</p>
        <p className="card-text">{plot}</p>
      </div>
    </div>
  );
};

export default MovieCard;