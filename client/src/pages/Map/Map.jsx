import React, { useCallback, useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import MapboxSection from "./MapboxSection";
import GraphSection from "./GraphSection";
import FetchData from "../../api/FetchData";

// \\ STYLE
import "./map.css";

// // || DATA
// import demografi from "../../data/demografi-semarang.geojson";
// import poi from "../../data/poi-semarang.geojson";

const Map = () => {
  const [demografiData, setDemografiData] = useState(null);
  const [poiData, setPoiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLayer, setActiveLayer] = useState("SLTP");
  const [activeCounty, setActiveCounty] = useState("Tembalang");
  const [inTransition, setInTransition] = useState(false);

  // Fetch API Demografi
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const demoresponse = await FetchData.get("/api/demografi-semarang");
        const demo_data = demoresponse.data.data.demografi[0].json_build_object;
        console.log("demo_data:", demo_data);
        setDemografiData(demo_data);
        const poiresponse = await FetchData.get("/api/poi-semarang");
        console.log("poiresponse:", poiresponse);
        const poi_data = poiresponse.data.data.poi[0].json_build_object;
        console.log("poi_data:", poi_data);
        setPoiData(poi_data);
        //Fetch Data Selesai
        setIsLoading(false);
        // Membaca nilai initial state activeCounty dari data GeoJSON
        const initialCounty =
          demo_data.features[104].properties["DESA ATAU KELURAHAN"];
        setActiveCounty(initialCounty);
      } catch (error) {
        console.error("Fetch API Demografi Gagal:", error);
      }
    };
    fetchAPI();
  }, []);
  // //Fetch Demografi
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // const demo_response = await fetch(demografi);
  //       // const demo_data = await demo_response.json();
  //       // console.log(demo_data);
  //       // setDemografiData(demo_data);
  //       // const poi_response = await fetch(poi);
  //       // const poi_data = await poi_response.json();
  //       // setPoiData(poi_data);
  //       // console.log("data demografi:", demo_data);
  //       // console.log("data poi:", poi_data);
  //       // Membaca nilai initial state activeCounty dari data GeoJSON
  //       // const initialCounty =
  //       //   demo_data.features[104].properties["DESA ATAU KELURAHAN"];
  //       // setActiveCounty(initialCounty);
  //     } catch (error) {
  //       console.error("Gagal mengambil data Demografi GeoJSON :", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  //Fungsi Pergantian Field Layer
  const onChangeLayer = useCallback(
    (selectedLayer) => {
      setInTransition(true);
      setTimeout(() => {
        setActiveLayer(selectedLayer);
      }, 500);
      setTimeout(() => {
        setInTransition(false);
      }, 500);
    },
    [setInTransition, setActiveLayer]
  );
  // Fungsi untuk Memperbaharui Poligon Kelurahan Aktif
  const onChangeCounty = useCallback(
    (selectedCounty) => {
      setActiveCounty(selectedCounty);
    },
    [setActiveCounty]
  );

  return (
    <div id="map-page">
      {/* Render Map */}
      {!isLoading && (
        <Container fluid>
          <Row>
            <Col xs={12} id="header-map">
              <NavigationBar />
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={8} id="mapbox-section">
              <div>
                <MapboxSection
                  demografiData={demografiData}
                  poiData={poiData}
                  activeLayer={activeLayer}
                  activeCounty={activeCounty}
                  onChangeCounty={onChangeCounty}
                  inTransition={inTransition}
                />
              </div>
            </Col>
            <Col xs={12} lg={4} id="graph-section">
              <div>
                <GraphSection
                  demografiData={demografiData}
                  activeCounty={activeCounty}
                  activeLayer={activeLayer}
                  onChangeLayer={onChangeLayer}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col id="footer-map">
              <Footer />
            </Col>
          </Row>
        </Container>
      )}
      {/* Fetch Data Loading */}
      {isLoading && (
        <div className="loading-page">
          <p>Please wait...</p>
        </div>
      )}
    </div>
  );
};

export default Map;
