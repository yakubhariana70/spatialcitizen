import React from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import logo from "../assets/icon/MapboxSection/spatialcitizen.svg";

const NavigationBar = () => {
  return (
    <div>
      <Navbar sticky="top" expand="lg">
        <Container fluid className="px-5">
          <Navbar.Brand href="/">
            <img alt="Logo" src={logo} width="auto" height="50" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Offcanvas
            id="offcanvas-navbar"
            aria-labelledby="offcanvas-navbar-label"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvas-navbar-label">
                <h2>
                  <span>SpatialCitizen </span>
                  <br />
                  <span>Semarang</span>
                </h2>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="ms-auto fw-semibold">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/#/map">Map</Nav.Link>
                <Nav.Link href="/#/storytelling">Storytelling</Nav.Link>
                <Nav.Link href="/#/about">About</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
