import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LinkContainer from 'react-router-bootstrap/LinkContainer';

const Header = () => {
  return (
    <div>
      <Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Tiger Sports Basketball League</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/schedule">
                <Nav.Link>Schedule</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/standings">
                <Nav.Link>Standings</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/results">
                <Nav.Link>Results</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
