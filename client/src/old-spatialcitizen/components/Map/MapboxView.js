import React, { useState, useEffect, useCallback, useRef } from "react";
import Map, {
  Source,
  Layer,
  Popup,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
} from "react-map-gl";
import ChangeBasemaps from "./mapbox-component/ChangeBasemaps";

const MapboxView = (props) => {
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoieWFrdWJoYXJpYW5hNzAiLCJhIjoiY2xpZXBpOGszMDdxMDNkbXJhdzZiMWhxZCJ9.2rFjAut4puYPoKzc1kPFXA"; // Ganti dengan token Mapbox

  // Menyimpan state viewport
  const [viewport, setViewport] = useState({
    longitude: 110.4,
    latitude: -7.01,
    pitch: 90,
    bearing: -35,
    zoom: 9.75,
  });

  const mapRef = useRef();
  // Menyimpan state informasi saat hover
  const [hoverInfo, setHoverInfo] = useState(null);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/navigation-night-v1"
  );

  // Mengambil data GeoJSON saat komponen dimount
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

  // SETTING CLICKED COUNTY
  const onClickCounty = (event) => {
    if (event.features && event.features.length > 0) {
      const clickedCounty = event.features && event.features[0];
      const countyName = clickedCounty.properties["DESA ATAU KELURAHAN"];
      props.onChangeCounty(countyName);
    }
  };

  // Mengubah gaya peta saat mengganti gaya
  const handleStyleChange = (style) => {
    setMapStyle(style);
  };

  const threeDStyle = {
    id: "demografi-layer",
    type: "fill-extrusion",
    paint: {
      "fill-extrusion-color": [
        "interpolate",
        ["linear"],
        ["get", props.activeLayer],
        minValue,
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

  const twoDStyle = {
    id: "demografi-layer",
    type: "fill",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", props.activeLayer],
        minValue,
        "#29B7A4",
        maxValue,
        "#037FFF",
      ],
      "fill-outline-color": "#1e1e1e",
      "fill-opacity": props.inTransition ? 0 : 1,
    },
  };

  const hover3DStyle = {
    id: "hover-3D-layer",
    type: "fill-extrusion",
    paint: {
      "fill-extrusion-color": "white",
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

  const hover2DStyle = {
    id: "hover-2D-layer",
    type: "fill",
    paint: {
      "fill-color": "white",
      "fill-outline-color": "#1e1e1e",
      "fill-opacity": props.inTransition ? 0 : 1,
    },
  };

  // || ANALISIS SPASIAL

  const onFlyFunction = useCallback((location) => {
    mapRef.current?.flyTo({
      center: [location.longitude, location.latitude],
      bearing: location.bearing,
      zoom: location.zoom,
      pitch: location.pitch,
      duration: location.duration,
    });
  }, []);

  useEffect(() => {
    if (props.analizeActive) {
      const location = {
        longitude: 110.4201,
        latitude: -7.05,
        pitch: 0,
        bearing: 0,
        zoom: 9.75,
        duration: 2000,
      };
      setViewport(location);
      onFlyFunction(location);
      console.log("onFlyFunction 2D");

    } else if (!props.analizeActive) {
      const location = {
        longitude: 110.4201,
        latitude: -7.01,
        pitch: 90,
        bearing: -35,
        zoom: 9.75,
        duration: 2000,
      };
      setViewport(location);
      onFlyFunction(location);
      console.log("onFlyFunction 3D");
    }
  }, [props.analizeActive, onFlyFunction]);

  const pointInPolygonStyle = {
    id: "point-in-polygon",
    type: "circle",
    className: "point",
    paint: {
      "circle-color": "red",
      "circle-radius": 3,
      "circle-stroke-width": 2,
      "circle-stroke-color": "black",
    },
  };

  return (
    <div id="mapbox-view">
      <Map
        style={{ width: "100%", height: "100%" }}
        initialViewState={viewport}
        onMove={(event) => setViewport(event.viewState)}
        ref={mapRef}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
        attributionControl={false}
        interactiveLayerIds={["demografi-layer"]}
        onMouseMove={onHover}
        onClick={onClickCounty}
      >
        {!props.analizeActive && (
          <Source id="layer-3D" type="geojson" data={props.demografiData}>
            <Layer {...threeDStyle} />
            <Layer {...hover3DStyle} filter={filter} />
          </Source>
        )}

        {props.analizeActive && props.activeCounty && (
          <>
            <Source id="layer-2D" type="geojson" data={props.demografiData}>
              <Layer {...twoDStyle} />
              <Layer {...hover2DStyle} filter={filter} />
            </Source>

            <Source
              id="layer-point-in-polygon"
              type="geojson"
              data={props.poiInPolygon}
            >
              <Layer {...pointInPolygonStyle} />
            </Source>
          </>
        )}

        {selectedCounty && (
          <Popup
            longitude={hoverInfo.longitude}
            latitude={hoverInfo.latitude}
            offset={[0, -10]}
            closeButton={false}
            className="county-info"
          >
            <h4>{selectedCounty}</h4>
            <p>
              {props.activeLayer}:{" "}
              {hoverInfo.countyProperties[props.activeLayer]}
            </p>
          </Popup>
        )}

        {/* Tambahkan kontrol dan marker lainnya di sini */}
        {/* <Marker longitude={110.4201} latitude={-7.01} color="red"></Marker> */}
        <div className="mapbox-control">
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ChangeBasemaps
            position="top-right"
            onStyleChange={handleStyleChange}
          />
        </div>
      </Map>
    </div>
  );
};

export default MapboxView;
