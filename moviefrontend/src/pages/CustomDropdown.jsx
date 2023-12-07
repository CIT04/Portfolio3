import React, { useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TypeContext from '../components/TypeContext';
import { useContext } from 'react';

const CustomDropdown = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const { types, setTypes } = useContext(TypeContext);

  const genres = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror'];
  
  const handleGenreChange = (genre) => {
    setSelectedGenres((prevGenres) => {
      if (prevGenres.includes(genre)) {
        return prevGenres.filter((selectedGenre) => selectedGenre !== genre);
      } else {
        return [...prevGenres, genre];
      }
    });
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prevTypes) => {
      if (prevTypes.includes(type)) {
        return prevTypes.filter((selectedType) => selectedType !== type);
      } else {
        return [...prevTypes, type];
      }
    });
  };

  return (
    <NavDropdown title="Filters" id="basic-nav-dropdown" className="custom-dropdown">
      <div className="d-flex flex-column p-4">
        {/* First Row - Genre */}
        <div className="mb-3">
          <h6 className="mb-2">Genre</h6>
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
        <div className="mb-3">
          <h6 className="mb-2">Type</h6>
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

        {/* Apply Button */}
        <Button variant="warning" className="mt-3" onClick={() => console.log('Apply Filters')}>
          Apply
        </Button>
      </div>
    </NavDropdown>
  );
};

export default CustomDropdown;