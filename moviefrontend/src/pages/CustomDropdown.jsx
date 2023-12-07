import React, { useState, useEffect } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TypeContext from '../components/TypeContext';
import { useContext } from 'react';

const CustomDropdown = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [error, setError] = useState('');
  const { types, setTypesList } = useContext(TypeContext);

  const genres = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror'];

  useEffect(() => {
    // Update allTypes whenever types change
    setAllTypes(types);
  }, []);

  const handleTypeChange = (type) => {
    setSelectedTypes((prevTypes) => {
      if (prevTypes.includes(type)) {
        return prevTypes.filter((selectedType) => selectedType !== type);
      } else {
        return [...prevTypes, type];
      }
    });
  };

  const handleApplyFilters = () => {
    if (selectedTypes.length === 0) {
      setError('Please select at least one type.');
    } else {
      setError('');
      setTypesList(selectedTypes);
      console.log('Apply Filters', selectedTypes);
    }
  };

  return (
    <NavDropdown title="Filters" id="basic-nav-dropdown" className="custom-dropdown">
      <div className="d-flex flex-column p-4">
        {/*TODO: Implement genres */}
        {/* ... (code for genres) */}

        {/* Types*/}
        <div className="mb-3">
          <h6 className="mb-2">Type</h6>
          <Form>
            {allTypes.map((type) => (
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
        <Button variant="warning" className="mt-3" onClick={handleApplyFilters}>
          Apply
        </Button>

        {/* Error Message */}
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </NavDropdown>
  );
};

export default CustomDropdown;
