import React, { useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "./Grafik.css";
import GraphToggle from "./grafik-component/GraphToggle";
import KependudukanSection from "./grafik-component/KependudukanSection";
import GeografisSection from "./grafik-component/GeografisSection";
import PendidikanSection from "./grafik-component/PendidikanSection";
import KesehatanSection from "./grafik-component/KesehatanSection";

const Grafik = ({
  demografiData,
  poiData,
  activeToggle,
  activeCounty,
  onChangeToggle,
  onChangeLayer,
  analizeActive,
  onChangePoiInPolygon,
  onChangeAnalize,
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

  // Fungsi Ganti Toggle dan Smooth Scrolling
  const handleScrollinView = useCallback(
    (buttonName, initial) => {
      onChangeToggle(buttonName);
      onChangeLayer(initial);
    },
    [onChangeToggle, onChangeLayer]
  );

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // 👇 Akan melakukan scroll dengan smooth ke bagian atas section berikutnya
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    console.log(
      "Kependudukan Visible:",
      kependudukanVisible,
      "Geografis Visible:",
      geografisVisible,
      "Pendidikan Visible:",
      pendidikanVisible,
      "Kesehatan Visible:",
      kesehatanVisible
    );

    if (kependudukanVisible) {
      handleScrollinView("Kependudukan", "JUMLAH PENDUDUK");
    } else if (geografisVisible) {
      handleScrollinView("Geografis", "LUAS WILAYAH (KM2)");
    } else if (pendidikanVisible) {
      handleScrollinView("Pendidikan", "TAMAT SD");
    } else if (kesehatanVisible) {
      handleScrollinView("Kesehatan", "TENAGA KESEHATAN");
    }
  }, [
    kependudukanVisible,
    geografisVisible,
    pendidikanVisible,
    kesehatanVisible,
    handleScrollinView,
  ]);

  // Pengaturan Data Demografi

  return (
    <div
      className="overflow-auto"
      style={{ maxWidth: "100%", maxHeight: "100%" }}
    >
      <GraphToggle
        className="data-nav shadow"
        activeToggle={activeToggle}
        scrollToSection={scrollToSection}
        activeCounty={activeCounty}
      />

      <section>
        <div className="graph-section" id="g-kependudukan">
          <KependudukanSection
            kependudukanRef={kependudukanRef}
            demografiData={demografiData}
            activeCounty={activeCounty}
            onChangeLayer={onChangeLayer}
          />
        </div>
        <div className="graph-section" id="g-geografis">
          <GeografisSection
            geografisRef={geografisRef}
            demografiData={demografiData}
            activeCounty={activeCounty}
            onChangeLayer={onChangeLayer}
          />
        </div>
        <div className="graph-section" id="g-pendidikan">
          <PendidikanSection
            pendidikanRef={pendidikanRef}
            demografiData={demografiData}
            poiData={poiData}
            activeCounty={activeCounty}
            onChangeLayer={onChangeLayer}
            analizeActive={analizeActive}
            onChangePoiInPolygon={onChangePoiInPolygon}
            onChangeAnalize={onChangeAnalize}
          />
        </div>
        <div className="graph-section" id="g-kesehatan" ref={kesehatanRef}>
          <KesehatanSection
            kesehatanRef={kesehatanRef}
            demografiData={demografiData}
            poiData={poiData}
            activeCounty={activeCounty}
            onChangeLayer={onChangeLayer}
            analizeActive={analizeActive}
            onChangePoiInPolygon={onChangePoiInPolygon}
            onChangeAnalize={onChangeAnalize}
          />
        </div>
      </section>
    </div>
  );
};

export default Grafik;
