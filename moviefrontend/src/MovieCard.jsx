import React, { useState,useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MovieCard({ title, plot, poster, year }) {
  return (
    <Col md={4} style={{ marginBottom: '20px' }}>
      <Card>
        {/* Assuming you have an image URL for each movie, replace 'holder.js/100px180' with the actual URL */}
        <Card.Img variant="top" src={poster} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{plot}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

function MovieCardList() {

  const [count, setCount] = useState(6);  // Load this many users
  const [medias, setMedias] = useState([]); // The list of users

  function loadMedias () {
    fetch("http://localhost:5001/api/media/")
      .then(res => res.json())
      .then(json => {setMedias(json.items);});
  }

  useEffect(loadMedias, [count]); // When count changes, load users again

  return (
    <div className="App">
      {/* Use Bootstrap Container, Row, and Col to create a grid */}
      <Container>
        <Row>
          {medias.map((media, index) => (
            <MovieCard key={index} title={media.title} plot={media.plot} poster={media.poster} year={media.year}/>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default MovieCardList;