import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

// || Navigasi Topik
import GraphToggle from "./components/GraphToggle";

// || Komponen Infografis
import KependudukanSection from "./components/KependudukanSection";
import GeografisSection from "./components/GeografisSection";
import PendidikanSection from "./components/PendidikanSection";
import KesehatanSection from "./components/KesehatanSection";

// || STYLE
import "./graphsection.css";

const GraphSection = ({
  demografiData,
  activeCounty,
  activeLayer,
  onChangeLayer,
}) => {
  //Pengaturan Deteksi Section
  const { ref: kependudukanRef, inView: kependudukanVisible } = useInView({
    threshold: 0.1,
  });
  const { ref: geografisRef, inView: geografisVisible } = useInView({
    threshold: 0.5,
  });
  const { ref: pendidikanRef, inView: pendidikanVisible } = useInView({
    threshold: 0.5,
  });
  const { ref: kesehatanRef, inView: kesehatanVisible } = useInView({
    threshold: 0.5,
  });

  const [activeToggle, setActiveToggle] = useState("Kependudukan");

  // Fungsi Ganti Toggle dan Smooth Scrolling
  const handleScrollinView = useCallback(
    (initial) => {
      onChangeLayer(initial);
    },
    [onChangeLayer]
  );

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // 👇 Akan melakukan scroll dengan smooth ke bagian atas section berikutnya
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (kependudukanVisible) {
      handleScrollinView("JUMLAH PENDUDUK");
      setActiveToggle("Kependudukan");
    } else if (geografisVisible) {
      handleScrollinView("LUAS WILAYAH (KM2)");
      setActiveToggle("Geografis");
    } else if (pendidikanVisible) {
      handleScrollinView("TAMAT SD");
      setActiveToggle("Pendidikan");
    } else if (kesehatanVisible) {
      handleScrollinView("GOLONGAN DARAH A");
      setActiveToggle("Kesehatan");
    }
  }, [
    kependudukanVisible,
    geografisVisible,
    pendidikanVisible,
    kesehatanVisible,
    handleScrollinView,
  ]);

  return (
    <div id="graph-view">
      <header>
        <div id="graph-toggle">
          <GraphToggle
            scrollToSection={scrollToSection}
            activeToggle={activeToggle}
            onChangeToggle={setActiveToggle}
          />
        </div>
        <div id="active-county">
          <h1>{activeCounty}</h1>
        </div>
      </header>
      <div id="graph-container">
        <section
          className="topic-section"
          ref={kependudukanRef}
          id="kependudukan-section"
        >
          <KependudukanSection
            demografiData={demografiData}
            activeCounty={activeCounty}
            activeLayer={activeLayer}
            onChangeLayer={onChangeLayer}
          />
        </section>
        <section
          className="topic-section"
          ref={geografisRef}
          id="geografis-section"
        >
          <GeografisSection
            demografiData={demografiData}
            activeCounty={activeCounty}
            activeLayer={activeLayer}
            onChangeLayer={onChangeLayer}
          />
        </section>
        <section
          className="topic-section"
          ref={pendidikanRef}
          id="pendidikan-section"
        >
          <PendidikanSection
            demografiData={demografiData}
            activeCounty={activeCounty}
            activeLayer={activeLayer}
            onChangeLayer={onChangeLayer}
          />
        </section>
        <section
          className="topic-section"
          ref={kesehatanRef}
          id="kesehatan-section"
        >
          <KesehatanSection
            demografiData={demografiData}
            activeCounty={activeCounty}
            activeLayer={activeLayer}
            onChangeLayer={onChangeLayer}
          />
        </section>
      </div>
    </div>
  );
};

export default GraphSection;
