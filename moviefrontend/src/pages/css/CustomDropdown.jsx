import React, { useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';

const CustomDropdown = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const genres = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror'];
  const types = ['Movie', 'Series', 'Game'];

  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((selectedType) => selectedType !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <NavDropdown title="Filters" id="basic-nav-dropdown">
      <div className="d-flex">
        {/* First Row - Genre */}
        <div className="flex-grow-1">
          <h6>Genre</h6>
          <Form>
            {genres.map((genre) => (
              <Form.Check
                key={genre}
                type="checkbox"
                label={genre}
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
              />
            ))}
          </Form>
        </div>

        {/* Second Row - Type */}
        <div className="flex-grow-1">
          <h6>Type</h6>
          <Form>
            {types.map((type) => (
              <Form.Check
                key={type}
                type="checkbox"
                label={type}
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
              />
            ))}
          </Form>
        </div>
      </div>
    </NavDropdown>
  );
};

export default CustomDropdown;
