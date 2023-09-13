import React, { useCallback, useEffect, useRef, useState } from "react";
import Map, { Layer, Source } from "react-map-gl";
import { useInView } from "react-intersection-observer";
import config from "./config";
import ChapterStory from "./ChapterStory";

import "./StorytellingMap.css";
import geoJSONData from "../../geo-data/demografi_kelurahan_semarang.geojson";

export default function StorytellingMap() {
  const [demografiData, setDemografiData] = useState(null);
  const [viewLayer, setViewLayer] = useState(false);
  const [layerOn, setLayerOn] = useState(null);
  const [viewport, setViewport] = useState({
    longitude: 110.40,
    latitude: -7.01,
    pitch: 0,
    bearing: 0,
    zoom: 5.5,
  });
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [inTransition, setInTransition] = useState(false)

  const mapRef = useRef();

  useEffect(() => {
    const fetchDemografi = async () => {
      try {
        const response = await fetch(geoJSONData);
        const data = await response.json();
        setDemografiData(data);
        console.log(data);
  
      } catch (error) {
        console.error('Gagal mengambil data Demografi GeoJSON :', error);
      }
    };
    fetchDemografi();

  }, [])  

  useEffect(() => {

    if (demografiData) {
      let min = Number.MAX_VALUE;
      let max = Number.MIN_VALUE;
      demografiData.features.forEach((feature) => {
        const value = feature.properties[layerOn];
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
  }, [demografiData, layerOn]);

  const { ref: sectionOne, inView: oneVisible } = useInView({ threshold: 0.8 });
  const { ref: sectionTwo, inView: twoVisible } = useInView({ threshold: 0.8 });
  const { ref: sectionThree, inView: threeVisible } = useInView({ threshold: 0.8 });
  const { ref: sectionFour, inView: fourVisible } = useInView({ threshold: 0.8 });
  const { ref: sectionFive, inView: fiveVisible } = useInView({ threshold: 0.8 });

  const onFlyFunction = useCallback((chapter) => {
    const location = chapter.location;
    setViewport(location);

    mapRef.current?.flyTo({
      center: [location.longitude, location.latitude],
      bearing: location.bearing,
      zoom: location.zoom,
      pitch: location.pitch,
      duration: location.duration,
    });
    setViewLayer(chapter.viewLayer);
    if (viewLayer) {
      setInTransition(true);
      setTimeout(() => {
        setLayerOn(chapter.layerName)
      }, 500);
      setTimeout(() => {
        setInTransition(false)
      }, 500);
    }
  }, [viewLayer]);

  const layerStyle = {
    type: "fill-extrusion",
    className: "3D-style",
    paint: {
      "fill-extrusion-color": [
        "interpolate",
        ["linear"],
        ["get", layerOn],
        minValue,
        "#29B7A4",
        maxValue,
        "#037FFF",
      ],
      "fill-extrusion-height": ["get", layerOn],
      "fill-extrusion-base": 0,
      "fill-extrusion-opacity": inTransition ? 0 : 1,
    },
  };

  useEffect(() => {
    console.log("One:", oneVisible, "Two:", twoVisible);

    if (oneVisible) {
      onFlyFunction(config.chapters[0]);
    } else if (twoVisible) {
      onFlyFunction(config.chapters[1]);
    } else if (threeVisible) {
      onFlyFunction(config.chapters[2]);
    } else if (fourVisible) {
      onFlyFunction(config.chapters[3]);
    } else if (fiveVisible) {
      onFlyFunction(config.chapters[4]);
    } 
  }, [oneVisible, twoVisible, threeVisible, fourVisible, fiveVisible, onFlyFunction]);

  return (
    <>
      <section id="map-storytelling">
        <Map
          ref={mapRef}
          style={{ height: "100vh", width: "100vw" }}
          initialViewState={viewport}
          mapStyle={config.style}
          mapboxAccessToken={config.accessToken}
        >
          {viewLayer && (
            <Source id="geojson-data" type="geojson" data={demografiData}>
              <Layer
                {...layerStyle}
                id="demografi-layer"
                source="geojson-data"
              />
            </Source>
          )}
        </Map>
      </section>
      <div id="story-section" className="d-flex flex-column overflow-x-auto" >
        <section className="chapter" ref={sectionOne}>
          <ChapterStory story={config.chapters[0]} />
        </section>
        <section className="chapter" ref={sectionTwo}>
          <ChapterStory story={config.chapters[1]} />
        </section>
        <section className="chapter" ref={sectionThree}>
          <ChapterStory story={config.chapters[2]} />
        </section>
        <section className="chapter" ref={sectionFour}>
          <ChapterStory story={config.chapters[3]} />
        </section>
        <section className="chapter" ref={sectionFive}>
          <ChapterStory story={config.chapters[4]} buttonText="Go to Demographic Map"/>
        </section>
      </div>
    </>
  );
}
