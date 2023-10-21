import React from "react";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import { Col, Container, Row } from "react-bootstrap";

// || STYLE
import "./about.css";

const About = () => {
  return (
    <div>
      <Container fluid className="container-about">
        <Col xs={12} lg={8} id="about-page">
          <Row
            style={{ position: "sticky", top: "0", zIndex: "1", margin: "0" }}
          >
            <div className="header-section">
              <NavigationBar />
            </div>
          </Row>
          <Row style={{ margin: "0" }}>
            <main>
              <div className="information-about">
                <h3> Background Spatial Citizen</h3>
                <p>
                  Semarang telah menerapkan berbagai program smart city yang
                  salah satunya dituangkan dalam portal Semarang Smart City yang
                  menyediakan fasilitas Smart Governance, Smart Branding, Smart
                  Economy, Smart Living, Smart Society, dan Smart Environment.
                  Untuk menunjang tercapainya Semarang smart city perlu
                  disediakan sebuah halaman informasi yang ramah pengguna dan
                  mudah dipahami oleh masyarakat sebagai upaya meningkatkan
                  kualitas pelayanan publik, meningkatkan daya saing dan daya
                  tarik Kota Semarang. Pada titik inilah kemampuan mengemas data
                  geospasial dan data non-spasial informasi Kota Semarang
                  menjadi penting. Menurut{" "}
                  <a href="https://www.jakarto.com/en/blog/smart-city-3d-geospatial-data-better-future">
                    (Laroche, 2022)
                  </a>{" "}
                  salah satu alat dalam membangun basis informasi smart city
                  adalah 3D mapping. 3D mapping mengimprovisasi sistem informasi
                  geografis tradisional (2D), dimana bentuk 3D dapat
                  menghasilkan visualisasi interaktif dan informatif dengan
                  analisis yang jauh lebih baik dalam proses pengambilan
                  keputusan oleh pemegang kepentingan. Terinspirasi oleh proyek
                  yang telah dibuat sebelumnya oleh Eughene Chen dan Nancy Ho
                  dalam{" "}
                  <a href="https://www.darkhorseanalytics.com/blog/3d-map-this-is-edmonton">
                    This is Edmonton
                  </a>
                  , dikembangkan halaman serupa Spatial Citizen Semarang untuk
                  menyajikan data demografi Kota Semarang dari aspek informasi
                  geografis.
                </p>
              </div>
              <div className="information-about">
                <h3>Goals Spatial Citizen</h3>
                <p>
                  Tujuan proyek Spatial Citizen Semarang adalah memudahkan akses informasi demografi Kota Semarang melalui sebuah WebGIS interaktif. Sehingga diharapkan WebGIS Spatial Citizen dapat membantu masyakat memahami dinamika kependudukan Kota Semarang dengan lebih baik. 
                </p>
              </div>
              <div className="information-about">
                <h3>Framework and Library</h3>
                <p>
                  Spatial Citizen Semarang dikembangkan dalam environtment
                  React.js (CRA) menggunakan bahasa pemrograman Javascript.
                  Beberapa library atau npm package yang digunakan yakni: <br />
                </p>
                <div>
                  <ul>
                    <li>Mapbox GL JS</li>
                    <li>Bootstrap v5</li>
                    <li>Chart JS</li>
                    <li>Turf JS</li>
                    <li>React Router DOM</li>
                  </ul>
                </div>
              </div>
              <div className="information-about">
                <h3>About me</h3>
                <div style={{fontWeight:"600"}}> <a href="https://www.linkedin.com/in/yakubhariana/" style={{ textDecoration: "none" }}>Yakub Hariana</a></div>
                <div style={{fontStyle:"italic"}}>Geodetic Engineer</div>
                <div style={{fontStyle:"italic"}}>Diponegoro University</div>
              </div>
            </main>
          </Row>
          <Row style={{ margin: "0" }}>
            <div className="footer-section">
              <Footer />
            </div>
          </Row>
        </Col>
        <Col xs={12} lg={4} id="about-image" style={{ margin: "0" }}>
          <div className="photo-source">
            Photo by{" "}
            <a href="https://unsplash.com/@madtur?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Muhamad Guntur
            </a>{" "}
            on{" "}
            <a href="https://unsplash.com/photos/hOalOOmFijo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
          </div>
        </Col>
      </Container>
    </div>
  );
};

export default About;
