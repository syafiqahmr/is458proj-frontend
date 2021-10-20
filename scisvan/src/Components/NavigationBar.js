import React from 'react';
import { Component } from 'react';
import { Navbar, Nav, Container, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavigationBar extends Component {

  render() {
    return (
      <div>
        <Navbar expand="md" bg="light" variant="light">
          <Container>
            <Navbar.Brand href="/">SCISVan</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link></Nav.Link>
              <Nav.Link><Link to="/today" style={{ textDecoration: 'none', color: 'inherit' }}>Today</Link></Nav.Link>
              <Nav.Link><Link to="/status" style={{ textDecoration: 'none', color: 'inherit' }}>Status</Link></Nav.Link>
              <Nav.Link><Link to="/location" style={{ textDecoration: 'none', color: 'inherit' }}>Location</Link></Nav.Link>

            </Nav>
          </Container>
        </Navbar>
      </div >
    );
  }
}

export default NavigationBar;