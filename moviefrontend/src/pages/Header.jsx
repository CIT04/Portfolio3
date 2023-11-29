import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import CustomDropdown from './css/CustomDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import './css/HeaderStyle.css';
import React, { useEffect, useState } from 'react';

function Header({ }) {
  const [searchInput, setSearchInput] = useState('');

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setSearchInput(value);
   
  // };

 
  const navi = useNavigate();
  

  return (
    <Navbar expand="lg" className="custom-navbar fixed-top">
      <Container>
        <Row className="w-100">
          {/* Logo with Image */}
          <Col xs={4}>
            <Navbar.Brand href="/" className="navbar-logo">
              <NavLink to="/">
                <Image
                  src={process.env.PUBLIC_URL + '/imdb.png'}
                  alt="det virker ikke"
                  width="100"
                  height="40"
                  className="d-inline-block align-top"
                />
              </NavLink>
            </Navbar.Brand>
          </Col>

          {/* Search Bar with Filters */}
          <Col xs={6} className="d-flex align-items-center">
            <CustomDropdown />

            <form className="d-flex flex-grow-1" onSubmit={()=>navi("/search/"+searchInput)}>
              <input
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={(e)=>setSearchInput(e.target.value)}
              />
              
              <button className="btn btn-secondary search-button" type="submit">
                Search
              </button>
            </form>
          </Col>

          {/* Signin */}
          <Col xs={2} className="d-flex align-items-center justify-content-end">
            <NavLink to="/signup" className="signin-link">
              Signin
            </NavLink>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Header;
