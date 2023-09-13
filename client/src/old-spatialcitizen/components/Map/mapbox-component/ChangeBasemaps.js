import React, {useState} from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';

const ChangeBasemaps = ({onStyleChange}) => {

        const [selectedStyle, setSelectedStyle] = useState("mapbox://styles/mapbox/navigation-night-v1");
      
        const handleStyleSelection = (style) => {
          setSelectedStyle(style);
          onStyleChange(style);
        };
    
    return(
        <DropdownButton 
            id="dropdown-basemaps" 
            title={<LayersRoundedIcon />} 
            variant="light"
            size="sm"
            className="position-absolute top-0 end-0 m-2"
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