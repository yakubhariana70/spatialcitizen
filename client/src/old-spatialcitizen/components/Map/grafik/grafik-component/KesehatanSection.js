import React, { useCallback, useEffect, useState } from "react";
import RankChart from "../RankChart";
import { useInView } from "react-intersection-observer";
// import * as Icon from 'react-bootstrap-icons'

// import PointWithinPolygons from "../../mapbox-component/PointWithinPolygons";

// || ICON 
import goldarAIcon from "../../../image-assets/Icon/Kesehatan/goldar-A.png";
import goldarBIcon from "../../../image-assets/Icon/Kesehatan/goldar-B.png";
import goldarABIcon from "../../../image-assets/Icon/Kesehatan/goldar-AB.png";
import goldarOIcon from "../../../image-assets/Icon/Kesehatan/goldar-O.png";

const KesehatanSection = ({
  kesehatanRef,
  demografiData,
  poiData,
  activeCounty,
  onChangeLayer,
  analizeActive,
  onChangePoiInPolygon,
  onChangeAnalize,
}) => {
  //Data Kependudukan
  const [golonganDarah, setGolonganDarah] = useState(null);

  useEffect(() => {
    if (demografiData) {
      //Fungsi event listener active County
      const grafikData = demografiData.features.find(
        (p) => p.properties["DESA ATAU KELURAHAN"] === activeCounty
      );

      // Destructuring Properti Kependudukan
      if (grafikData) {
        const {
          "GOLONGAN DARAH A": goldar_A,
          "GOLONGAN DARAH B": goldar_B,
          "GOLONGAN DARAH AB": goldar_AB,
          "GOLONGAN DARAH O": goldar_O,
        } = grafikData.properties;

        const golDar = [goldar_A, goldar_B, goldar_AB, goldar_O];

        const golDarChartData = {
          labels: ["A", "B", "AB", "O"],
          datasets: [
            {
              label: "Jumlah",
              data: golDar,
              backgroundColor: ["#037FFF", "#29B7A4"],
            },
          ],
        };
        setGolonganDarah(golDarChartData);
      }
    }
  }, [demografiData, activeCounty]);

  //Pengaturan Deteksi Item
  const { ref: golonganDarahRef, inView: golonganDarahVisible } = useInView({
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
    if (golonganDarahVisible) {
      handleScrollLayer("GOLONGAN DARAH A");
    }
  }, [golonganDarahVisible, handleScrollLayer]);

  //|| Section Kesehatan
  const [rankKesehatan, setRankKesehatan] = useState("GOLONGAN DARAH A");

  return (
    <div ref={kesehatanRef}>
      <h2>KESEHATAN</h2>
      <div className="graph-item" ref={golonganDarahRef}>
        {golonganDarah && (
            <>
              <div
                className="info-container"
                onClick={() => {
                  onChangeLayer("GOLONGAN DARAH A");
                  setRankKesehatan("GOLONGAN DARAH A");
                }}
              >
                <div className="svg-icon border">
                <img src={goldarAIcon} alt="goldar-A"/>
                </div>
                <div className="info-text border ms-2">
                  <span> Golongan Darah A </span>
                  <br />
                  <strong>{golonganDarah.datasets[0].data[0]}</strong>
                </div>
              </div>
              <div
                className="info-container"
                onClick={() => {
                  onChangeLayer("GOLONGAN DARAH B");
                  setRankKesehatan("GOLONGAN DARAH B");
                }}
              >
                <div className="svg-icon border">
                <img src={goldarBIcon} alt="goldar-B"/>
                </div>
                <div className="info-text border ms-2">
                  <span> Golongan Darah B </span>
                  <br />
                  <strong>{golonganDarah.datasets[0].data[1]}</strong>
                </div>
              </div>
              <div
                className="info-container"
                onClick={() => {
                  onChangeLayer("GOLONGAN DARAH AB");
                  setRankKesehatan("GOLONGAN DARAH AB");
                }}
              >
                <div className="svg-icon border">
                <img src={goldarABIcon} alt="goldar-AB"/>
                </div>
                <div className="info-text border ms-2">
                  <span> Golongan Darah AB </span>
                  <br />
                  <strong>{golonganDarah.datasets[0].data[2]}</strong>
                </div>
              </div>
              <div
                className="info-container"
                onClick={() => {
                  onChangeLayer("GOLONGAN DARAH O");
                  setRankKesehatan("GOLONGAN DARAH O");
                }}
              >
                <div className="svg-icon border">
                <img src={goldarOIcon} alt="goldar-O"/>
                </div>
                <div className="info-text border ms-2">
                  <span> Golongan Darah O </span>
                  <br />
                  <strong>{golonganDarah.datasets[0].data[3]}</strong>
                </div>
              </div>
          <RankChart
            demografiData={demografiData}
            activeCounty={activeCounty}
            selectedItem={rankKesehatan}
          />
        </>
        )}

        {/* <PointWithinPolygons
          demografiData={demografiData}
          poiData={poiData}
          activeCounty={activeCounty}
          analizeActive={analizeActive}
          onChangePoiInPolygon={onChangePoiInPolygon}
          onChangeAnalize={onChangeAnalize}
          poiFilterProps="FASILITAS KESEHATAN"
          tipeFieldProps="TIPE_1"
          buttonText="Fasilitas Kesehatan"
        /> */}
      </div>
    </div>
  );
};

export default KesehatanSection;
