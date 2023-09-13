import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";

const GraphToggle = ({ activeToggle, activeCounty, scrollToSection }) => {
  return (
    <div className="position-sticky top-0">
      <ButtonGroup
        className="d-flex flex-wrap justify-content-center shadow-sm"
        size="sm"
        aria-label="data-nav"
        >
        <Button
          variant={activeToggle === "Kependudukan" ? "success" : "light"}
          onClick={() => scrollToSection("g-kependudukan")}
        >
          Kependudukan
        </Button>
        <Button
          variant={activeToggle === "Geografis" ? "success" : "light"}
          onClick={() => scrollToSection("g-geografis")}
        >
          Geografis
        </Button>
        <Button
          variant={activeToggle === "Pendidikan" ? "success" : "light"}
          onClick={() => scrollToSection("g-pendidikan")}
        >
          Pendidikan
        </Button>
        <Button
          variant={activeToggle === "Kesehatan" ? "success" : "light"}
          onClick={() => scrollToSection("g-kesehatan")}
        >
          Kesehatan
        </Button>
      </ButtonGroup>

      <div className="active-county overflow-hidden shadow-sm">
        <h1>{activeCounty}</h1>
        {/* Scroll top : {scrollTop} */}
      </div>
    </div>
  );
};

export default GraphToggle;
