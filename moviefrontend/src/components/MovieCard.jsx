// Importing necessary modules and components
import React from 'react';
import Card from 'react-bootstrap/Card'; 
import './css/MovieCard.css'; 
import { NavLink } from 'react-router-dom'; 
import { renderImage } from "./imageUtil"; 

// Functional component 'MovieCard' with props 'title', 'plot', 'poster', and 'year'
export function MovieCard({ title, plot, poster, year }) {
  return (
    <Card>
      {/* Displaying the movie poster, tilte, plotand release year */}
      <Card.Img variant="top" src={poster} className="card-img-top"  />
      <Card.Body>
        <Card.Title><h5><b><center>{title}</center></b></h5></Card.Title>
        <Card.Text className="card-plot">{plot}</Card.Text>
        <Card.Text>{year}</Card.Text>
      </Card.Body>
    </Card>
  );
}
export default MovieCard;
