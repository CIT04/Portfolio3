import React from 'react';
import Card from 'react-bootstrap/Card';
import './css/MovieCard.css';
import { NavLink } from 'react-bootstrap';


export function MovieCard({ title, plot, poster, year }) {
  return (
   
    <Card>
       
      <Card.Img variant="top" src={poster} className="card-img-top" />
      <NavLink to = "/media">
      <Card.Body>
        <Card.Title><h5>{title}<h1/></h5></Card.Title>
        <Card.Text><h6>{plot}</h6></Card.Text>
        <Card.Text>{year}</Card.Text>
      </Card.Body>
      </NavLink>
    </Card>
    
  );
}

export default MovieCard;
