import React, { useCallback, useEffect, useState } from "react";
import RankChart from "../RankChart";
import { useInView } from "react-intersection-observer";
// import * as Icon from "react-bootstrap-icons";

// || ICON 
import luasWilayahIcon from "../../../image-assets/Icon/Geografis/luas-wilayah.png";
import ketinggianTanahIcon from "../../../image-assets/Icon/Geografis/ketinggian-tanah.png";



const GeografisSection = ({
  geografisRef,
  demografiData,
  activeCounty,
  onChangeLayer,
}) => {
  //Data Kependudukan
  const [luasWilayah, setLuasWilayah] = useState(null);

  useEffect(() => {
    if (demografiData) {
      //Fungsi event listener active County
      const grafikData = demografiData.features.find(
        (p) => p.properties["DESA ATAU KELURAHAN"] === activeCounty
      );

      // Destructuring Properti Kependudukan
      if (grafikData) {
        const { "LUAS WILAYAH (KM2)": luas_wilayah } = grafikData.properties;

        const array_lw = [luas_wilayah];

        const luasWilayahChartData = {
          labels: ["LUAS WILAYAH (KM2)"],
          datasets: [
            {
              label: "KM2",
              data: array_lw,
              backgroundColor: ["#29B7A4"],
            },
          ],
        };
        setLuasWilayah(luasWilayahChartData);
      }
    }
  }, [demografiData, activeCounty]);

  //Pengaturan Deteksi Item
  const { ref: luasWilayahRef, inView: luasWilayahVisible } = useInView({
    threshold: 0.75,
  });

  //Fungsi Change Layer on Scroll
  const handleScrollLayer = useCallback(
    (layer) => {
      onChangeLayer(layer);
    },
    [onChangeLayer]
  );

  useEffect(() => {
    console.log("Luas Wilayah", luasWilayahVisible);

    if (luasWilayahVisible) {
      handleScrollLayer("LUAS WILAYAH (KM2)");
    }
  }, [luasWilayahVisible, handleScrollLayer]);

  // Section Geografis
  const [rankGeografis, setRankGeografis] = useState("JUMLAH PENDUDUK");

  return (
    <div ref={geografisRef}>
      <h2>GEOGRAFIS</h2>
      <div className="graph-item" ref={luasWilayahRef}>
        {luasWilayah && (
          <>
            <div
              className="info-container"
              style={{ height: "3rem" }}
              onClick={() => {
                onChangeLayer("LUAS WILAYAH (KM2)");
                setRankGeografis("LUAS WILAYAH (KM2)");
              }}
            >
              <div className="svg-icon border">
              <img src={luasWilayahIcon} alt="luas-wilayah"/>
              </div>
              <div className="info-text border ms-2">
                <span> Luas Wilayah </span>
                <br />
                <strong>
                  {luasWilayah.datasets[0].data[0]} km<sup>2</sup>
                </strong>
              </div>
            </div>
            <div
              className="info-container"
              style={{ height: "3rem" }}
              onClick={() => {
                onChangeLayer("LUAS WILAYAH (KM2)");
                setRankGeografis("LUAS WILAYAH (KM2)");
              }}
            >
              <div className="svg-icon border">
              <img src={ketinggianTanahIcon} alt="ketinggian-tanah"/>
              </div>
              <div className="info-text border ms-2">
                <span> Ketinggian Tanah </span>
                <br />
                <strong> {luasWilayah.datasets[0].data[0]} mdpl</strong>
              </div>
            </div>
            <RankChart
              demografiData={demografiData}
              activeCounty={activeCounty}
              selectedItem={rankGeografis}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default GeografisSection;
