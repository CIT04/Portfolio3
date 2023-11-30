import React from 'react';
import Card from 'react-bootstrap/Card';
import './css/MovieCard.css';
import { NavLink } from 'react-router-dom';


export function MovieCard({ mediaid, title, plot, poster, year }) {
  return (
    <NavLink to={"/media/"+mediaid} className="nav-link">
    <Card>
      <Card.Img variant="top" src={poster} className="card-img-top" />
      <Card.Body>
        <Card.Title><h5>{mediaid}{title}<h1/></h5></Card.Title>
        <Card.Text><h6>{plot}</h6></Card.Text>
        <Card.Text>{year}</Card.Text>
      </Card.Body>
    </Card>
  </NavLink>
  );
}

export default MovieCard;
