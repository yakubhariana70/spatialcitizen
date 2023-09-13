import React, { useCallback, useEffect, useState } from "react";
import Map, { Layer, Source } from "react-map-gl";

import * as turf from "@turf/turf";

import demografi_semarang from "../../../../geo-data/demografi_kelurahan_semarang.geojson";
import poiSemarang from "../../../../geo-data/poi_semarang_Q1_2023.geojson";

const Turf = () => {
  const [viewState, setViewState] = useState({
    longitude: 110.4,
    latitude: -7.01,
    zoom: 11,
  });
  const [demografiData, setDemografiData] = useState(null);
  const [poiData, setPoiData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [activeCounty, setActiveCounty] = useState(null);

  useEffect(() => {
    const fetchDemografi = async () => {
      try {
        const response = await fetch(demografi_semarang);
        const data = await response.json();
        setDemografiData(data);
        console.log(data);
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

  // || LAYER STYLE
  const pointStyle = {
    id: "point-poi",
    type: "circle",
    className: "point",
    paint: {
      "circle-color": "#4264fb",
      "circle-radius": 6,
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
    },
  };

  const layerStyle = {
    id: "poligon-demografi",
    type: "fill",
    className: "point",
    paint: {
      "fill-color": "#FFFAE9",
      "fill-outline-color": "#1E1E1E",
      "fill-opacity": 0.5,
    },
  };

  const pointInPolygonStyle = {
    id: "point-in-polygon",
    type: "circle",
    className: "point",
    paint: {
      "circle-color": "red",
      "circle-radius": 6,
      "circle-stroke-width": 2,
      "circle-stroke-color": "black",
    },
  };

  const hoverStyle = {
    id: "hover-data",
    type: "fill",
    paint: {
      "fill-color": "purple",
      "fill-outline-color": "black",
      "fill-opacity": 1,
    },
  };

  // || FUNGSI-FUNGSI
  // Callback saat melakukan hover pada peta
  const onHover = useCallback(
    (event) => {
      const county = event.features && event.features[0];
      setHoverInfo({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        countyName: county && county.properties["DESA ATAU KELURAHAN"],
        countyProperties: county && county.properties,
      });
    },
    [setHoverInfo]
  );

  const selectedCounty = (hoverInfo && hoverInfo.countyName) || "";
  const filter = ["in", "DESA ATAU KELURAHAN", selectedCounty];

  const onClickCounty = (event) => {
    if (event.features && event.features.length > 0) {
      const clickedCounty = event.features && event.features[0];
      const countyName = clickedCounty.properties["DESA ATAU KELURAHAN"];
      setActiveCounty(countyName);
    }
  };
  useEffect(() => {
    console.log("Active County adalah:", activeCounty);
  }, [activeCounty]);

  // || ANALISIS SPASIAL
  const [analizeActive, setAnalizeActive] = useState(false);
  const [poiInPolygon, setPoiInPolygon] = useState(null);

  // Mengaktifkan fitur analisis
  const setSpatialAnalize = () => {
    setAnalizeActive(!analizeActive);
  };

  useEffect(() => {
    console.log("Analisis Spasial:", analizeActive);
  }, [analizeActive]);

  // Fungsi untuk menampilkan poin di dalam poligon county aktif
  const showPointInActiveCounty = useCallback(() => {
    if (
      analizeActive &&
      activeCounty &&
      poiData &&
      poiData.features &&
      demografiData &&
      demografiData.features
    ) {
      // Ambil geometri county aktif
      const activeCountyFeature = demografiData.features.find((feature) => {
        return feature.properties["DESA ATAU KELURAHAN"] === activeCounty;
      });

      if (activeCountyFeature) {
        // Buat poligon dari geometri county aktif
        const activeCountyPolygon = turf.polygon(
          activeCountyFeature.geometry.coordinates[0]
        );

        console.log("activeCountyPolygon", activeCountyPolygon);

        const points = poiData.features.map((feature) =>
          turf.point(feature.geometry.coordinates)
        );
        const turfPoints = turf.featureCollection(points);
        console.log("turfPoints:", turfPoints);

        // Gunakan turf.pointsWithinPolygon untuk mendapatkan poin di dalam poligon
        const pointsInActiveCounty = turf.pointsWithinPolygon(turfPoints,activeCountyPolygon);
        setPoiInPolygon(pointsInActiveCounty);
      } else {
        console.error("Data county aktif tidak ditemukan");
      }
    } else {
      console.error("Data county aktif atau data POI tidak valid");
    }
  }, [demografiData, poiData, activeCounty, analizeActive]);

  useEffect(() => {
    if (analizeActive && activeCounty) {
      showPointInActiveCounty();
    }
  }, [analizeActive, showPointInActiveCounty, activeCounty]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Map
        {...viewState}
        mapboxAccessToken="pk.eyJ1IjoieWFrdWJoYXJpYW5hNzAiLCJhIjoiY2xpZXBpOGszMDdxMDNkbXJhdzZiMWhxZCJ9.2rFjAut4puYPoKzc1kPFXA"
        onMove={(event) => setViewState(event.viewState)}
        interactiveLayerIds={["poligon-demografi"]} //interactiveLayerId penting untuk mendeteksi event.feature
        onMouseMove={onHover}
        onClick={onClickCounty}
        mapStyle="mapbox://styles/mapbox/navigation-night-v1"
      >
        <Source id="layer-polygon" type="geojson" data={demografi_semarang}>
          <Layer {...layerStyle} source="layer-poligon" />
          <Layer {...hoverStyle} source="layer-polygon" filter={filter} />
        </Source>

        {/* <Source id="layer-point" type="geojson" data={poiSemarang}>
          <Layer {...pointStyle} />
        </Source> */}

        {analizeActive && activeCounty && (
          <Source
            id="layer-point-in-polygon"
            type="geojson"
            data={poiInPolygon}
            >
            <Layer {...pointInPolygonStyle} />
          </Source>
        )}
      </Map>
      <button
        onClick={showPointInActiveCounty}
        style={{ position: "absolute", top: "10px", right: "10px", zIndex: 99 }}
      >
        Cek Poin in Poligon
      </button>
      <button
        onClick={setSpatialAnalize}
        style={{
          position: "absolute",
          top: "40px",
          right: "10px",
          zIndex: 99,
          backgroundColor: "blue",
          color: "white",
        }}
      >
        Aktifkan Analisis Spasial
      </button>
    </div>
  );
};

export default Turf;
