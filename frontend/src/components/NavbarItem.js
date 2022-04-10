import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const NavbarItem = () => {
  return (
    <navbar>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">OSF Digital</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="ml-auto">
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Men</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Women</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/login">
                <i className="fas fa-user"></i> Sign In
              </Nav.Link>
              <Nav.Link href="/wishlist">
                <i className="fas fa-heart"></i> Wishlist
              </Nav.Link>
              <Nav.Link href="/cart">
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </navbar>
  );
};

export default NavbarItem;
