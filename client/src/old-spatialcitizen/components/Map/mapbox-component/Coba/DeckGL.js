import React, { useState } from 'react';
import DeckGL, {GeoJsonLayer} from 'deck.gl';
import Map from 'react-map-gl';
import { scaleThreshold } from 'd3-scale';

import demografiData from '../../../../geo-data/demografi_kelurahan_semarang.geojson'


// import poiSemarang from '../../../../geo-data/poi_semarang_Q1_2023.geojson'

const COLOR_SCALE = scaleThreshold()
  .domain([-0.6, -0.45, -0.3, -0.15, 0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.05, 1.2])
  .range([
    [65, 182, 196],
    [127, 205, 187],
    [199, 233, 180],
    [237, 248, 177],
    // zero
    [255, 255, 204],
    [255, 237, 160],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    [227, 26, 28],
    [189, 0, 38],
    [128, 0, 38]
  ]);

function DeckGLMap() {

  const [viewState, setViewState] = useState({
    latitude: -7.01,
    longitude: 110.4201,
    zoom: 11,
    bearing: -35,
    pitch: 90
  });
  
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoieWFrdWJoYXJpYW5hNzAiLCJhIjoiY2xpZXBpOGszMDdxMDNkbXJhdzZiMWhxZCJ9.2rFjAut4puYPoKzc1kPFXA";
  
  const MAP_STYLE = 'mapbox://styles/mapbox/navigation-night-v1';

  const handleChangeViewState = ({viewState}) => setViewState(viewState)

  const onClick = info => {
    if (info.object) {
      // eslint-disable-next-line
      alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
    }
  };

  const layer_demografi = [
    new GeoJsonLayer({
      id: "demografi-layer",
      data: demografiData,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 2,
      opacity: 0.4,
      getLineColor: [60, 60, 60],
      pickable: true,
      autoHighlight: true,
      extruded: true,
      wireframe: true,
      getElevation: f => Math.sqrt(f.properties.SLTP) * 10,
      getFillColor: f => COLOR_SCALE(f.properties.SLTA),
      onClick
    })
  ]
  return (
    <div style={{ height: "100vh" }}>
      
      <DeckGL
        controller ={true} 
        layers={layer_demografi}
        initialViewState={viewState}
        >
        <Map
          viewState={viewState}
          onMove= {handleChangeViewState}
          mapStyle={MAP_STYLE}
          mapboxAccessToken={MAPBOX_TOKEN}
          preventStyleDiffing={true}
        >
        </Map>
      </DeckGL>

    </div>
  );
}

export default DeckGLMap;
