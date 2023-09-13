import {Navbar, Container, Nav, Offcanvas} from 'react-bootstrap'
import logo from './image-assets/logo.png';
// import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar sticky="top" expand="lg" className="p-0">
      <Container fluid style={{height:"10vh"}}>
        <Navbar.Brand  href="/">
        <img
              alt="Logo"
              src={logo}
              width="auto"
              height="40"
              className="d-inline-block align-top"
              style={{marginLeft:"5vw"}} />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Offcanvas 
          id="offcanvas-navbar"
          aria-labelledby="offcanvas-navbar-label"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id='offcanvas-navbar-label'>
              <h2> 
                <span className='fw-bold text-success'>SpatialCitizen </span>
                <br/>
                <span className='fw-bold text-black'>Semarang</span>
              </h2>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="ms-auto fw-semibold me-5 ">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/map">Map</Nav.Link>
              <Nav.Link href="/guide">Guideline</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
