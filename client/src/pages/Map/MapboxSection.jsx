import React, { useState, useEffect, useCallback, useRef } from "react";
import Map, {
  Source,
  Layer,
  Marker,
  Popup,
  FullscreenControl,
  NavigationControl,
} from "react-map-gl";
import ChangeBasemaps from "./components/ChangeBasemaps";
import ChangeDimension from "./components/ChangeDimension";
import SpatialAnalyze from "./components/SpatialAnalyze";

// || STYLE
import "./mapboxsection.css";

// || IMPORT SYMBOL POI
import symbolpendidikan from "../../assets/icon/MapboxSection/Education.png";
import symbolkesehatan from "../../assets/icon/MapboxSection/Health.png";

const MapboxSection = (props) => {
  //Akses Mapbox GL JS menggunakan Mapbox Token
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoieWFrdWJoYXJpYW5hNzAiLCJhIjoiY2xpZXBpOGszMDdxMDNkbXJhdzZiMWhxZCJ9.2rFjAut4puYPoKzc1kPFXA";

  //Referensi Map
  const mapRef = useRef();

  // Menyimpan state viewport
  const [viewport, setViewport] = useState({
    longitude: 110.4,
    latitude: -7.01,
    pitch: 90,
    bearing: -35,
    zoom: 9.75,
  });

  // State Hover
  const [hoverCounty, setHoverCounty] = useState(null);
  // Callback saat melakukan hover pada peta
  const onHover = useCallback(
    (event) => {
      const county = event.features && event.features[0];
      setHoverCounty({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        countyName: county && county.properties["DESA ATAU KELURAHAN"],
        countyProperties: county && county.properties,
      });
    },
    [setHoverCounty]
  );
  const selectedCounty = (hoverCounty && hoverCounty.countyName) || "";
  const filter = ["in", "DESA ATAU KELURAHAN", selectedCounty];

  // Fungsi Pergantian Kelurahan
  const onClickCounty = (event) => {
    if (event.features && event.features.length > 0) {
      const clickedCounty = event.features && event.features[0];
      const countyName = clickedCounty.properties["DESA ATAU KELURAHAN"];
      props.onChangeCounty(countyName);
    }
  };

  // Fungsi Kalkulasi Min-Max
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    if (props.demografiData) {
      let min = Number.MAX_VALUE;
      let max = Number.MIN_VALUE;
      props.demografiData.features.forEach((feature) => {
        const value = feature.properties[props.activeLayer];
        if (value < min) {
          min = value;
        }
        if (value > max) {
          max = value;
        }
      });

      setMinValue(min);
      setMaxValue(max);
    }
  }, [props.demografiData, props.activeLayer]);

  // Style halaman Mapbox GL JS dengan initial value style navigasi malam
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v12"
  );

  //Fungsi mengubah basemap
  const handleStyleChange = (style) => {
    setMapStyle(style);
  };

  //Dimensi Layer
  const [mapDimension, setMapDimension] = useState("3D");

  const handleDimensionChange = (dimension) => {
    setMapDimension(dimension);
  };

  const onFlyFunction = useCallback((location) => {
    mapRef.current?.flyTo({
      center: [location.longitude, location.latitude],
      bearing: location.bearing,
      zoom: location.zoom,
      pitch: location.pitch,
      duration: location.duration,
    });
  }, []);

  // || ANALISIS SPASIAL
  const [poiInPolygon, setPoiInPolygon] = useState(null);
  const [analizeActive, setAnalizeActive] = useState(null);

  useEffect(() => {
    if (analizeActive) {
      const location = {
        longitude: 110.4201,
        latitude: -7.05,
        pitch: 0,
        bearing: 0,
        zoom: 9.75,
        duration: 2000,
      };
      setMapDimension("2D");
      onFlyFunction(location);
    } else if (!analizeActive) {
      const location = {
        longitude: 110.4201,
        latitude: -7.01,
        pitch: 90,
        bearing: -35,
        zoom: 9.75,
        duration: 2000,
      };
      setMapDimension("3D");
      onFlyFunction(location);
    }
  }, [analizeActive, onFlyFunction]);

  //Style Layer
  const twoDimensionStyle = {
    id: "demografi-layer",
    type: "fill",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", props.activeLayer],
        minValue,
        "#E6F5F2",
        (minValue + maxValue) / 2,
        "#29B7A4",
        maxValue,
        "#037FFF",
      ],
      "fill-outline-color": "#1e1e1e",
      "fill-opacity": props.inTransition ? 0 : 1,
    },
  };

  const hover2DStyle = {
    id: "demografi-hover-2D",
    type: "fill",
    paint: {
      "fill-color": "#7E43F5",
      "fill-outline-color": "#1e1e1e",
      "fill-opacity": props.inTransition ? 0 : 1,
    },
  };

  const threeDimensionStyle = {
    id: "demografi-layer",
    type: "fill-extrusion",
    paint: {
      "fill-extrusion-color": [
        "interpolate",
        ["linear"],
        ["get", props.activeLayer],
        minValue,
        "#E6F5F2",
        (minValue + maxValue) / 2,
        "#29B7A4",
        maxValue,
        "#037FFF",
      ],
      "fill-extrusion-height": [
        "interpolate",
        ["linear"],
        ["get", props.activeLayer],
        minValue,
        100,
        maxValue,
        5000,
      ],
      "fill-extrusion-base": 0,
      "fill-extrusion-opacity": props.inTransition ? 0 : 1,
    },
  };

  const hover3DStyle = {
    id: "demografi-hover-3D",
    type: "fill-extrusion",
    paint: {
      "fill-extrusion-color": "#7E43F5",
      "fill-extrusion-height": [
        "interpolate",
        ["linear"],
        ["get", props.activeLayer],
        minValue,
        100,
        maxValue,
        5000,
      ],
      "fill-extrusion-base": 0,
      "fill-extrusion-opacity": props.inTransition ? 0 : 1,
    },
  };

  return (
    <div id="mapbox-view">
      <Map
        initialViewState={viewport}
        ref={mapRef}
        onMove={(event) => setViewport(event.viewState)}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={["demografi-layer"]}
        onMouseMove={onHover}
        onClick={onClickCounty}
        maxPitch={60}
      >
        {!analizeActive && mapDimension === "3D" && (
          <Source
            id="layer-demografi"
            type="geojson"
            data={props.demografiData}
          >
            <Layer {...threeDimensionStyle} />
            <Layer {...hover3DStyle} filter={filter} />
          </Source>
        )}

        {!analizeActive && mapDimension === "2D" && (
          <Source
            id="layer-demografi"
            type="geojson"
            data={props.demografiData}
          >
            <Layer {...twoDimensionStyle} />
            <Layer {...hover2DStyle} filter={filter} />
          </Source>
        )}

        {analizeActive && mapDimension === "3D" && (
          <>
            <Source
              id="layer-demografi"
              type="geojson"
              data={props.demografiData}
            >
              <Layer {...threeDimensionStyle} />
              <Layer {...hover3DStyle} filter={filter} />
            </Source>
            <Source
              id="layer-point-in-polygon"
              type="geojson"
              data={poiInPolygon}
            >
            </Source>
            {/* Marker */}
            {poiInPolygon &&
              poiInPolygon.features.map((feature, index) => (
                <Marker
                  key={index}
                  longitude={feature.geometry.coordinates[0]}
                  latitude={feature.geometry.coordinates[1]}
                >
                  {/* Konten yang ingin Anda tampilkan di marker */}
                  <div>
                    <img
                      src={analizeActive === "Fasilitas Pendidikan" ? symbolpendidikan : symbolkesehatan}
                      alt="Marker Icon"
                      width="30px"
                      height="35px"
                    />
                    <p>{feature.properties.NAMA}</p>
                  </div>
                </Marker>
              ))}
          </>
        )}

        {analizeActive && mapDimension === "2D" && (
          <>
            <Source
              id="layer-demografi"
              type="geojson"
              data={props.demografiData}
            >
              <Layer {...twoDimensionStyle} />
              <Layer {...hover2DStyle} filter={filter} />
            </Source>
            <Source
              id="layer-point-in-polygon"
              type="geojson"
              data={poiInPolygon}
            >
            </Source>
            {/* Marker */}
            {poiInPolygon &&
              poiInPolygon.features.map((feature, index) => (
                <Marker
                  key={index}
                  longitude={feature.geometry.coordinates[0]}
                  latitude={feature.geometry.coordinates[1]}
                >
                  {/* Konten yang ingin Anda tampilkan di marker */}
                  <div>
                    <img
                      src={analizeActive === "Fasilitas Pendidikan" ? symbolpendidikan : symbolkesehatan}
                      alt="Marker Icon"
                      width="30px"
                      height="35px"
                    />
                    <p>{feature.properties.name}</p>
                  </div>
                </Marker>
              ))}
          </>
        )}

        {selectedCounty && (
          <Popup
            longitude={hoverCounty.longitude}
            latitude={hoverCounty.latitude}
            offset={[0, -10]}
            closeButton={false}
            className="county-info"
          >
            <h4>{selectedCounty}</h4>
            <p>
              {props.activeLayer} :{" "}
              {hoverCounty.countyProperties[props.activeLayer]}
            </p>
          </Popup>
        )}

        <div className="mapbox-control">
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
        </div>
        <div className="custom-control">
          <ChangeBasemaps onStyleChange={handleStyleChange} />
          <ChangeDimension
            mapDimension={mapDimension}
            onFlyFunction={onFlyFunction}
            onDimensionChange={handleDimensionChange}
          />
          <SpatialAnalyze
            demografiData={props.demografiData}
            poiData={props.poiData}
            activeCounty={props.activeCounty}
            analizeActive={analizeActive}
            onChangeAnalyze={setAnalizeActive}
            onChangePoiInPolygon={setPoiInPolygon}
          />
        </div>
      </Map>
    </div>
  );
};

export default MapboxSection;
