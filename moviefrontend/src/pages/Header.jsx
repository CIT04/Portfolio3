import React, { useContext, useState } from 'react';
import { Container, Navbar, Row, Col, Image, Button, Nav, Form } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import CustomDropdown from './CustomDropdown';
import UserContext from '../components/UserContext';
import './css/HeaderStyle.css';

function Header() {
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(null);
  const { userToken, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const sanitizeSearchString = (searchString) => {
    // Check for invalid characters using regex
    if (/[^a-zA-Z0-9\s]/.test(searchString)) {
      throw new Error('Invalid characters in search input. Please use only alphanumeric characters and spaces.');
    }
  
    // Remove any unwanted characters using regex (allowing only alphanumeric and spaces)
    return searchString.trim(); // Added trim to remove leading and trailing spaces
  };

  const handleSearch = (e) => {

    e.preventDefault();
    
    try {
  
      const sanitizedSearchInput = sanitizeSearchString(searchInput);

      console.log('Sanitized Search Input:', sanitizedSearchInput);
      setError(null);
      
    } catch (error) {
      setError(error.message);
      console.error('Error:', error.message);
    }
    navigate(`/search/${searchInput}`);
  };

  return (
    <Navbar expand="lg" className="custom-navbar fixed-top">
      <Container fluid>
        <Row className="w-100 align-items-center">
          {/* Logo with Image */}
          <Col xs={4}>
            <Navbar.Brand as={NavLink} to="/" className="navbar-logo">
              <Image
                src={process.env.PUBLIC_URL + '/imdb.png'}
                alt="Logo"
                width="100"
                height="40"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </Col>

          {/* Search Bar with Filters */}
          <Col xs={6} className="d-flex align-items-center">
            <CustomDropdown />
            <Form className="d-flex" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={`search-input ${error ? 'is-invalid' : ''}`}
                
              />
              <Button variant="secondary" type="submit" className="search-button">
                Search
              </Button>
              {error && <div className="invalid-feedback">{error}</div>}
            </Form>
          </Col>

          {/* Signin/Signup */}
          <Col xs={2} className="d-flex align-items-center justify-content-end">
            {userToken != null ? (
              <>
                <Nav.Link as={NavLink} to="/user" className="signin-link">
                  <Button variant="secondary" className="search-button">
                    {userToken.username}
                  </Button>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/" className="signin-link">
                  <Button variant="secondary" className="search-button" onClick={() => setToken(null)}>
                    Log Out
                  </Button>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/signup" className="signin-link">
                  <Button variant="secondary" className="search-button" outline>
                    Sign Up
                  </Button>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login" className="signin-link">
                  <Button variant="secondary" className="search-button" outline>
                    Log In
                  </Button>
                </Nav.Link>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Header;
