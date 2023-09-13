import NavigationBar from '../Navbar';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import './home.css'


const Home = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12} lg={3} id='hero-image'>
          </Col>
          <Col xs={12} lg={9} id='main-content'>
            <Row>
            <nav>
              <NavigationBar />
            </nav>
            </Row>
            <Row>
              <main className='d-flex flex-column justify-content-center flex-wrap px-5'>
                  <h1 id="hero-title" className='fw-bold mb-3'>
                    Spatial Insight 
                    about Semarang Citizen.
                  </h1>
                  <p id='hero-text' className='herotext mb-2 mb-md-5'>
                  Let’s bring Semarang demographic data to live! More accessible and easy to understand with 3D mapping web GIS.
                  </p>
                  <div id='homebutton'>
                    <Link to="/storytelling" className="btn btn-success btn-lg shadow-sm me-3 mb-2">Explore Now</Link>
                    <Link to="/about" className="btn btn-outline-success btn-lg shadow-sm">About us</Link>
                  </div>
              </main>
            </Row>
            
      
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Home;
