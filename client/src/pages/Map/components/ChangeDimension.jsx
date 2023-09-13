import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import icon2D from "../../../assets/icon/MapboxSection/2D.svg";
import icon3D from "../../../assets/icon/MapboxSection/3D.svg";

const ChangeDimension = ({ mapDimension, onDimensionChange, onFlyFunction }) => {

  const handleDimensionSelection = (dimension) => {
    if (dimension === "2D") {
        const location = {
            longitude: 110.4201,
            latitude: -7.05,
            pitch: 0,
            bearing: 0,
            zoom: 9.75,
            duration: 2000,
          }
          onDimensionChange(dimension)
          onFlyFunction(location);
    } else {
        const location = {
            longitude: 110.4201,
            latitude: -7.01,
            pitch: 90,
            bearing: -35,
            zoom: 9.75,
            duration: 2000,
          }
          onDimensionChange(dimension)
          onFlyFunction(location);
    }
  };
//...
  return (
    <DropdownButton
      id="dropdown-basemaps"
      title={
        <img src={mapDimension === "3D" ? icon3D : icon2D} alt="layer-icon" style={{ height: "1.5em" }} />
      }
      variant="light"
      size="sm"
    >
      <Dropdown.Item
        active={mapDimension === "2D"}
        onClick={() =>
          handleDimensionSelection("2D")
        }
      >
        2D
      </Dropdown.Item>
      <Dropdown.Item
        active={mapDimension === "3D"}
        onClick={() =>
          handleDimensionSelection("3D")
        }
      >
        3D
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default ChangeDimension;
