import React from 'react';
import Card from 'react-bootstrap/Card';
import './css/MovieCard.css';


export function MovieCard({ title, plot, poster, year }) {
  return (
    <Card>
      <Card.Img variant="top" src={poster} className="card-img-top" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{plot}</Card.Text>
        <Card.Text>{year}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
