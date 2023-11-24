import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MovieCard({ title, description }) {
  return (
    <Col md={4} style={{ marginBottom: '20px' }}>
      <Card>
        {/* Assuming you have an image URL for each movie, replace 'holder.js/100px180' with the actual URL */}
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

function MovieCardList() {
  // Movie data array
  const movies = [
    { title: 'Movie 1', description: 'Description for Movie 1' },
    { title: 'Movie 2', description: 'Description for Movie 2' },
    { title: 'Movie 3', description: 'Description for Movie 3' },
    // Add more movies as needed
  ];

  return (
    <div className="App">
      {/* Use Bootstrap Container, Row, and Col to create a grid */}
      <Container>
        <Row>
          {movies.map((movie, index) => (
            <MovieCard key={index} title={movie.title} description={movie.description} />
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default MovieCardList;