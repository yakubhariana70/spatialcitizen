import React, { useCallback, useEffect, useState } from "react";
import NavigationBar from "../Navbar";
import { Col, Container, Row } from "react-bootstrap";
import MapboxView from "./MapboxView";
import Grafik from "./grafik/Grafik";
import ToggleProperti from "./ToggleProperti";

import "./map.css";

import demografi_semarang from "../../geo-data/demografi_kelurahan_semarang.geojson";
import poiSemarang from "../../geo-data/poi_semarang_Q1_2023.geojson";

const MapView = () => {
  const [demografiData, setDemografiData] = useState(null);
  const [poiData, setPoiData] = useState(null);
  const [activeToggle, setActiveToggle] = useState("Kependudukan");
  const [activeLayer, setActiveLayer] = useState("SLTP");
  const [activeCounty, setActiveCounty] = useState("");
  const [inTransition, setInTransition] = useState(false);

  useEffect(() => {
    const fetchDemografi = async () => {
      try {
        const response = await fetch(demografi_semarang);
        const data = await response.json();
        setDemografiData(data);
        console.log(data);

        // Membaca nilai initial state activeCounty dari data GeoJSON
        const initialCounty =
          data.features[104].properties["DESA ATAU KELURAHAN"];
        setActiveCounty(initialCounty);
      } catch (error) {
        console.error("Gagal mengambil data Demografi GeoJSON :", error);
      }
    };
    const fetchPOI = async () => {
      try {
        const response = await fetch(poiSemarang);
        const data = await response.json();
        setPoiData(data);
        console.log(data);
      } catch (error) {
        console.error("Gagal mengambil data POI Semarang GeoJSON :", error);
      }
    };
    fetchDemografi();
    fetchPOI();
  }, []);

  const onChangeToggle = useCallback(
    (selectedToggle) => {
      setActiveToggle(selectedToggle);
    },
    [setActiveToggle]
  );

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

  const onChangeCounty = useCallback(
    (selectedCounty) => {
      setActiveCounty(selectedCounty);
    },
    [setActiveCounty]
  );

  // || ANALISIS SPASIAL
  const [poiInPolygon, setPoiInPolygon] = useState(null);
  const [analizeActive, setAnalizeActive] = useState(false);

  const onChangePoiInPolygon = (poi) => {
    setPoiInPolygon(poi);
  };

  const onChangeAnalize = useCallback(() => {
    setAnalizeActive(!analizeActive);
  },[analizeActive]);

  return (
    <div id="map-view">
      <header>
        <NavigationBar />
      </header>
      <section id="toggle-properti">
        <Container
          fluid
          className="position-relative top-50 translate-middle-y"
        >
          <Row>
            {/* Toggle Button */}
            <Col
              sm={12}
              className="toggle-button d-flex flex-wrap align-items-center"
            >
              <ToggleProperti
                demografiData={demografiData}
                activeToggle={activeToggle}
                activeLayer={activeLayer}
                onChangeLayer={onChangeLayer}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <main>
        <Container fluid>
          <Row className="d-flex flex-wrap">
            {/* Mapbox View Start*/}
            <Col sm={12} lg={8} className="p-0">
              <div id="mapbox-view">
                <MapboxView
                  demografiData={demografiData}
                  poiData={poiData}
                  poiInPolygon={poiInPolygon}
                  activeLayer={activeLayer}
                  activeCounty={activeCounty}
                  inTransition={inTransition}
                  onChangeCounty={onChangeCounty}
                  analizeActive={analizeActive}
                />
              </div>
            </Col>
            {/* Mapbox View End*/}

            {/* Data and Graph View Start*/}
            <Col sm={12} lg={4} className="border p-0">
              <div id="grafik-section">
                <Grafik
                  demografiData={demografiData}
                  poiData={poiData}
                  activeToggle={activeToggle}
                  activeCounty={activeCounty}
                  onChangeToggle={onChangeToggle}
                  onChangeLayer={onChangeLayer}
                  analizeActive={analizeActive}
                  onChangePoiInPolygon={onChangePoiInPolygon}
                  onChangeAnalize={onChangeAnalize}
                />
              </div>
            </Col>
            {/* Data and Graph View End*/}
          </Row>
        </Container>
      </main>
      <footer>
        <Container fluid className="d-flex align-items-center">
          <Row className="flex-grow-1">
            <Col sm={12} className="d-flex justify-content-between">
              <p className="position-relative top-50 translate-middle-y">
                <strong className="text-success">Data :</strong> Semarang
                Demographic Data
              </p>
              <p className="position-relative top-50 translate-middle-y">
                © Created by Yakub Hariana
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default MapView;
