import React from 'react';
import Card from 'react-bootstrap/Card';
import './css/MovieCard.css';
import { NavLink } from 'react-router-dom';
import { renderImage } from "./imageUtil";

export function MovieCard({ title, plot, poster, year }) {
  return (
    
    <Card>
      <Card.Img variant="top" src={poster} className="card-img-top"  />
      <Card.Body>
        <Card.Title><h5><b><center>{title}</center></b></h5></Card.Title>
        <Card.Text><h6>{plot}</h6></Card.Text>
        <Card.Text>{year}</Card.Text>
      </Card.Body>
    </Card>

  );
}

export default MovieCard;
