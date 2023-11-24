import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
          {/**Logo */}
          <Navbar.Brand href="#">
  <Image
    src={process.env.PUBLIC_URL + '/imdb.png'}
    alt="det virker ikke"
    width="100"
    height="40"
    className="d-inline-block align-top"
  />
  Navbar
</Navbar.Brand>
        <Navbar.Toggle type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarColor03">
          <Nav className="navbar-nav me-auto">
              {/**search bar */}
          <form className="d-flex">
            <input className="form-control me-sm-2" type="search" placeholder="Search" />
            {/**filters */}
          <NavDropdown title="Filters" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Action</NavDropdown.Item>
              <NavDropdown.Item href="#">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
            </NavDropdown>
               {/**Search button */}
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            <Navbar.Toggle />
        
            <Navbar.Text>
                <button className="btn btn-secondary my-2 my-sm-0" type="submit">Signin</button>
             </Navbar.Text>
      
            {/**   Sign in  */}
         
          </form>
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
