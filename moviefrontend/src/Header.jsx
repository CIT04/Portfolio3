import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import CustomDropdown from './CustomDropdown';




function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top">
      <Container>
        <Row className="w-100">
          {/* Logo with Image */}
          <Col xs={4}>
            <Navbar.Brand href="#">
              <Image
                src={process.env.PUBLIC_URL + '/imdb.png'}
                alt="det virker ikke"
                width="100"
                height="40"
                className="d-inline-block align-top"
              />
             

            </Navbar.Brand>
          </Col>

          {/* Search Bar with Filters */}
          <Col xs={4} className="d-flex align-items-center">
            <form className="d-flex">
              <input className="form-control me-sm-2" type="search" placeholder="Search" />

              <CustomDropdown/>

              <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </Col>

          {/* Signin */}
          <Col xs={4} className="d-flex align-items-center justify-content-end">
            <Nav.Link href="#link">Signin</Nav.Link>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
