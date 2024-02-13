import React, { useCallback, useEffect, useRef, useState } from "react";
import Map, { Layer, Source } from "react-map-gl";
import { useInView } from "react-intersection-observer";
import ChapterStory from "./ChapterStory";
import NavigationBar from "../../components/NavigationBar";
// import FetchData from "../../api/FetchData";

// || DATA
import story from "../../data/chapter-story.jsx";
import demografi from "../../data/demografi-semarang.geojson";

// || STYLE
import "./storytelling.css";

const Storytelling = () => {
  // State untuk menyimpan data dari demografi Semarang
  const [demografiData, setDemografiData] = useState(null);
  // State untuk mendefinisikan viewport peta
  const [viewport, setViewport] = useState({
    longitude: 110.4,
    latitude: -7.01,
    pitch: 0,
    bearing: 0,
    zoom: 5.5,
  });
  //State untuk konfigurasi layer dalam peta
  const [viewLayer, setViewLayer] = useState(false);
  const [layerStyle, setLayerStyle] = useState(null);
  const [layerOn, setLayerOn] = useState(null);
  // State untuk min-max value dari properti geoJSON
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  // State untuk mendeteksi transisi antar layer
  const [inTransition, setInTransition] = useState(false);

  //Loading Layer API
  const [isLoading, setIsLoading] = useState(true);

  //Referensi terhadap peta
  const mapRef = useRef();

  //Fetch Demografi
  useEffect(() => {
    const fetchDemografi = async () => {
      try {
        // const response = await FetchData.get("/api/demografi-semarang");
        // const data = response.data.data.demografi[0].json_build_object;

        const response = await fetch(demografi);
        const data = await response.json();

        console.log("story_data:", data);
        setDemografiData(data);
        //Fetch Data Selesai
        setIsLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data Demografi GeoJSON :", error);
      }
    };
    fetchDemografi();
  }, []);

  //Kalkulasi min-max value
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

  // Intersection Observer Pengguna
  const { ref: sectionOne, inView: oneVisible } = useInView({ threshold: 0.8 });
  const { ref: sectionTwo, inView: twoVisible } = useInView({ threshold: 0.8 });
  const { ref: sectionThree, inView: threeVisible } = useInView({
    threshold: 0.8,
  });
  const { ref: sectionFour, inView: fourVisible } = useInView({
    threshold: 0.8,
  });
  const { ref: sectionFive, inView: fiveVisible } = useInView({
    threshold: 0.8,
  });
  const { ref: sectionSix, inView: sixVisible } = useInView({
    threshold: 0.8,
  });
  const { ref: sectionSeven, inView: sevenVisible } = useInView({
    threshold: 0.8,
  });

  // Fungsi FlyTo
  const onFlyFunction = useCallback(
    (chapter) => {
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
          setLayerOn(chapter.layerName);
        }, 1000);
        setTimeout(() => {
          setInTransition(false);
        }, 1000);
      }
    },
    [viewLayer]
  );

  useEffect(() => {
    console.log("One:", oneVisible, "Two:", twoVisible);

    if (oneVisible) {
      onFlyFunction(story.chapters[0]);
    } else if (twoVisible) {
      onFlyFunction(story.chapters[1]);
      setLayerStyle("2D");
    } else if (threeVisible) {
      onFlyFunction(story.chapters[2]);
      setLayerStyle("2D-driven");
    } else if (fourVisible) {
      onFlyFunction(story.chapters[3]);
      setLayerStyle("3D");
    } else if (fiveVisible) {
      onFlyFunction(story.chapters[4]);
    } else if (sixVisible) {
      onFlyFunction(story.chapters[5]);
    } else if (sevenVisible) {
      onFlyFunction(story.chapters[6]);
    }
  }, [
    oneVisible,
    twoVisible,
    threeVisible,
    fourVisible,
    fiveVisible,
    sixVisible,
    sevenVisible,
    onFlyFunction,
  ]);

  const twoDimensionStyle = {
    type: "fill",
    className: "2D-style",
    paint: {
      "fill-color": "rgba(6, 39, 70, 0.875)",
      "fill-outline-color": "#FFFFFF",
      "fill-opacity": inTransition ? 0 : 1,
    },
  };
  const twoDimensionDrivenStyle = {
    type: "fill",
    className: "2D-driven-style",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", layerOn],
        minValue,
        "#E6F5F2",
        (minValue + maxValue) / 2,
        "#29B7A4",
        maxValue,
        "#037FFF",
      ],
      "fill-outline-color": "#1e1e1e",
      "fill-opacity": inTransition ? 0 : 1,
    },
  };
  const threeDimensionStyle = {
    type: "fill-extrusion",
    className: "3D-style",
    paint: {
      "fill-extrusion-color": [
        "interpolate",
        ["linear"],
        ["get", layerOn],
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
        ["get", layerOn],
        minValue,
        100,
        maxValue,
        5000,
      ],
      "fill-extrusion-base": 0,
      "fill-extrusion-opacity": inTransition ? 0 : 1,
    },
  };

  return (
    <div>
      {/* Render Map */}
      {!isLoading && (
        <div id="map-storytelling">
          <header>
            <nav>
              <NavigationBar />
            </nav>
          </header>
          <section id="mapbox-storytelling">
            <Map
              ref={mapRef}
              style={{ height: "100vh", width: "100vw" }}
              initialViewState={viewport}
              mapStyle={story.style}
              mapboxAccessToken={story.accessToken}
            >
              {viewLayer && layerStyle === "2D" && (
                <Source id="geojson-data" type="geojson" data={demografiData}>
                  <Layer
                    {...twoDimensionStyle}
                    id="demografi-layer"
                    source="geojson-data"
                  />
                </Source>
              )}
              {viewLayer && layerStyle === "2D-driven" && (
                <Source id="geojson-data" type="geojson" data={demografiData}>
                  <Layer
                    {...twoDimensionDrivenStyle}
                    id="demografi-layer"
                    source="geojson-data"
                  />
                </Source>
              )}
              {viewLayer && layerStyle === "3D" && (
                <Source id="geojson-data" type="geojson" data={demografiData}>
                  <Layer
                    {...threeDimensionStyle}
                    id="demografi-layer"
                    source="geojson-data"
                  />
                </Source>
              )}
            </Map>
          </section>
          <div id="story-section">
            <section className="chapter" ref={sectionOne}>
              <ChapterStory story={story.chapters[0]} />
            </section>
            <section className="chapter" ref={sectionTwo}>
              <ChapterStory story={story.chapters[1]} />
            </section>
            <section className="chapter" ref={sectionThree}>
              <ChapterStory story={story.chapters[2]} />
            </section>
            <section className="chapter" ref={sectionFour}>
              <ChapterStory story={story.chapters[3]} />
            </section>
            <section className="chapter" ref={sectionFive}>
              <ChapterStory story={story.chapters[4]} />
            </section>
            <section className="chapter" ref={sectionSix}>
              <ChapterStory story={story.chapters[5]} />
            </section>
            <section className="chapter" ref={sectionSeven}>
              <ChapterStory
                story={story.chapters[6]}
                buttonText="Go to Demographic Map"
              />
            </section>
          </div>
        </div>
      )}
      {/* Fetch Data Loading */}
      {isLoading && (
        <div className="loading-page">
          <div className="custom-loader"></div>
          <br />
          <p>Please wait...</p>
        </div>
      )}
    </div>
  );
};

export default Storytelling;
