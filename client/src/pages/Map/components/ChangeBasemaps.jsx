import React, {useState} from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import layericon from '../../../assets/icon/MapboxSection/layer.svg';

const ChangeBasemaps = ({onStyleChange}) => {

        const [selectedStyle, setSelectedStyle] = useState("mapbox://styles/mapbox/navigation-night-v1");
      
        const handleStyleSelection = (style) => {
          setSelectedStyle(style);
          onStyleChange(style);
        };
    
    return(
        <DropdownButton 
            id="dropdown-basemaps" 
            title={
            <img src={layericon} alt="layer-icon" style={{height:"1.5em"}}/>
            } 
            variant="light"
            size="sm"
        >
            <Dropdown.Item 
                active={selectedStyle === "mapbox://styles/mapbox/navigation-night-v1"} 
                onClick={() => handleStyleSelection("mapbox://styles/mapbox/navigation-night-v1")}
            >
                Dark Navigation
            </Dropdown.Item>
            <Dropdown.Item 
                active={selectedStyle === "mapbox://styles/mapbox/navigation-day-v1"} 
                onClick={() => handleStyleSelection("mapbox://styles/mapbox/navigation-day-v1")}
            >
                Light Navigation
            </Dropdown.Item>
            <Dropdown.Item 
                active={selectedStyle === "mapbox://styles/mapbox/light-v9"} 
                onClick={() => handleStyleSelection("mapbox://styles/mapbox/light-v9")}
            >
                Light
            </Dropdown.Item>
            <Dropdown.Item 
                active={selectedStyle === "mapbox://styles/mapbox/dark-v9"} 
                onClick={() => handleStyleSelection("mapbox://styles/mapbox/dark-v9")}
            >
                Dark
            </Dropdown.Item>
            <Dropdown.Item 
                active={selectedStyle === "mapbox://styles/mapbox/streets-v12"} 
                onClick={() => handleStyleSelection("mapbox://styles/mapbox/streets-v12")}
            >
                Streets
            </Dropdown.Item>
            <Dropdown.Item 
                active={selectedStyle === "mapbox://styles/mapbox/satellite-v9"} 
                onClick={() => handleStyleSelection("mapbox://styles/mapbox/satellite-v9")}
            >
                Satellite
            </Dropdown.Item>
        </DropdownButton>
    );
};

export default ChangeBasemaps;