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
              <Nav.Link><Link to="/create" style={{ textDecoration: 'none', color: 'inherit' }}>Create</Link></Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div >
    );
  }
}

export default NavigationBar;