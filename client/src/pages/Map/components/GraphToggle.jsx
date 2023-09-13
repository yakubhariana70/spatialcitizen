import React, { useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";

// || STYLE
import "./graphtoggle.css";

const GraphToggle = ({ scrollToSection }) => {
  const [activeToggle, setActiveToggle] = useState("Kependudukan");

  const scrollFunction = (toggle, section) => {
    setActiveToggle(toggle);
    scrollToSection(section);
  };
  return (
    <div>
      <ButtonGroup className="button-toggle shadow" aria-label="topic-navigation">
        <Button
          variant={activeToggle === "Kependudukan" ? "success" : "outline-success"}
          onClick={() => scrollFunction("Kependudukan", "kependudukan-section")}
        >
          Kependudukan
        </Button>
        <Button
          variant={activeToggle === "Geografis" ? "success" : "outline-success"}
          onClick={() => scrollFunction("Geografis", "geografis-section")}
        >
          Geografis
        </Button>
        <Button
          variant={activeToggle === "Pendidikan" ? "success" : "outline-success"}
          onClick={() => scrollFunction("Pendidikan", "pendidikan-section")}
        >
          Pendidikan
        </Button>
        <Button
          variant={activeToggle === "Kesehatan" ? "success" : "outline-success"}
          onClick={() => scrollFunction("Kesehatan", "kesehatan-section")}
        >
          Kesehatan
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default GraphToggle;
