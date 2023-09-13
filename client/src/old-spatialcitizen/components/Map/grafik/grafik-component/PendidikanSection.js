import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PointWithinPolygons from "../../mapbox-component/PointWithinPolygons";
import RankChart from "../RankChart";
// import * as Icon from "react-bootstrap-icons";

// || ICON 
import SDIcon from "../../../image-assets/Icon/Pendidikan/sd.png";
import SMPIcon from "../../../image-assets/Icon/Pendidikan/smp.png";
import SMAIcon from "../../../image-assets/Icon/Pendidikan/sma.png";
import diplomaIcon from "../../../image-assets/Icon/Pendidikan/diploma.png";
import sarjanaIcon from "../../../image-assets/Icon/Pendidikan/sarjana.png";



const PendidikanSection = ({
  pendidikanRef,
  demografiData,
  poiData,
  activeCounty,
  onChangeLayer,
  analizeActive,
  onChangePoiInPolygon,
  onChangeAnalize,
}) => {
  // Pengaturan Data Demografi
  //Data Pendidikan
  const [tingkatPendidikan, setTingkatPendidikan] = useState(null);

  useEffect(() => {
    if (demografiData) {
      //Fungsi event listener active County
      const grafikData = demografiData.features.find(
        (p) => p.properties["DESA ATAU KELURAHAN"] === activeCounty
      );

      // Destructuring Properti Pendidikan
      if (grafikData) {
        const {
          "TAMAT SD": sd,
          SLTP: smp,
          SLTA: sma,
          "D1 DAN D2": d1dand2,
          D3: d3,
          S1: s1,
          S2: s2,
          S3: s3,
        } = grafikData.properties;

        const pendidikan = [sd, smp, sma, d1dand2, d3, s1, s2, s3];

        const PendidikanChartData = {
          labels: ["SD", "SMP", "SMA", "D1 DAN D2", "D3", "S1", "S2", "S3"],
          datasets: [
            {
              label: "Pendidikan",
              data: pendidikan,
              backgroundColor: ["#037FFF", "#29B7A4"],
            },
          ],
        };
        setTingkatPendidikan(PendidikanChartData);
      }
    }
  }, [demografiData, activeCounty]);

  //Pengaturan Deteksi Item
  const { ref: tingkatPendidikanRef, inView: tingkatPendidikanVisible } =
    useInView({ threshold: 0.75 });

  //Fungsi Change Layer on Scroll
  const handleScrollLayer = useCallback(
    (layer) => {
      onChangeLayer(layer);
    },
    [onChangeLayer]
  );

  useEffect(() => {
    if (tingkatPendidikanVisible) {
      handleScrollLayer("TAMAT SD");
    }
  }, [tingkatPendidikanVisible, handleScrollLayer]);

  // Section Pendidikan
  const [rankPendidikan, setRankPendidikan] = useState("TAMAT SD");

  return (
    <div ref={pendidikanRef}>
      <h2>PENDIDIKAN</h2>
      <div
        className="graph-item"
        id="g-tingkat-pendidikan"
        ref={tingkatPendidikanRef}
      >
        {tingkatPendidikan && (
          <>
            <div
              className="info-container"
              onClick={() => {
                onChangeLayer("TAMAT SD");
                setRankPendidikan("TAMAT SD)");
              }}
            >
              <div className="svg-icon border">
              <img src={SDIcon} alt="sekolah-dasar"/>
              </div>
              <div className="info-text border ms-2">
                <span> Sekolah Dasar </span>
                <br />
                <strong>{tingkatPendidikan.datasets[0].data[0]}</strong>
              </div>
            </div>
            <div
              className="info-container"
              onClick={() => {
                onChangeLayer("SLTP");
                setRankPendidikan("SLTP");
              }}
            >
              <div className="svg-icon border">
              <img src={SMPIcon} alt="sekolah-menengah-pertama"/>
              </div>
              <div className="info-text border ms-2">
                <span> Sekolah Menengah Pertama </span>
                <br />
                <strong>{tingkatPendidikan.datasets[0].data[1]}</strong>
              </div>
            </div>
            <div
              className="info-container"
              onClick={() => {
                onChangeLayer("SLTA");
                setRankPendidikan("SLTA");
              }}
            >
              <div className="svg-icon border">
              <img src={SMAIcon} alt="sekolah-menengah-atas"/>
              </div>
              <div className="info-text border ms-2">
                <span> Sekolah Menengah Atas </span>
                <br />
                <strong>{tingkatPendidikan.datasets[0].data[2]}</strong>
              </div>
            </div>
            <div className="two-column">
              <div
                className="info-container"
                  onClick={() => {
                  onChangeLayer("D1 DAN D2");
                  setRankPendidikan("D1 DAN D2");
                }}
              >
                <div className="svg-icon border">
                <img src={diplomaIcon} alt="diploma-1"/>
                </div>
                <div className="info-text border ms-2">
                  <span> D1 dan D2 </span>
                  <br />
                  <strong>{tingkatPendidikan.datasets[0].data[3]}</strong>
                </div>
              </div>
              <div
                className="info-container"
                  onClick={() => {
                  onChangeLayer("D3");
                  setRankPendidikan("D3");
                }}
              >
                <div className="svg-icon border">
                <img src={diplomaIcon} alt="diploma-3"/>
                </div>
                <div className="info-text border ms-2">
                  <span> D3 </span>
                  <br />
                  <strong>{tingkatPendidikan.datasets[0].data[4]}</strong>
                </div>
              </div>
            </div>
            <div className="three-column">
              <div
                className="info-container"
                  onClick={() => {
                  onChangeLayer("S1");
                  setRankPendidikan("S1");
                }}
              >
                <div className="svg-icon border">
                <img src={sarjanaIcon} alt="sarjana-1"/>
                </div>
                <div className="info-text border ms-2">
                  <span> S1 </span>
                  <br />
                  <strong>{tingkatPendidikan.datasets[0].data[5]}</strong>
                </div>
              </div>
              <div
                className="info-container"
                  onClick={() => {
                  onChangeLayer("S2");
                  setRankPendidikan("S2");
                }}
              >
                <div className="svg-icon border">
                <img src={sarjanaIcon} alt="sarjana-2"/>
                </div>
                <div className="info-text border ms-2">
                  <span> S2 </span>
                  <br />
                  <strong>{tingkatPendidikan.datasets[0].data[6]}</strong>
                </div>
              </div>
              <div
                className="info-container"
                  onClick={() => {
                  onChangeLayer("S3");
                  setRankPendidikan("S3");
                }}
              >
                <div className="svg-icon border">
                <img src={sarjanaIcon} alt="sarjana-3"/>
                </div>
                <div className="info-text border ms-2">
                  <span> S3 </span>
                  <br />
                  <strong>{tingkatPendidikan.datasets[0].data[7]}</strong>
                </div>
              </div>
            </div>
            <RankChart
              demografiData={demografiData}
              activeCounty={activeCounty}
              selectedItem={rankPendidikan}
            />
          </>
        )}
        <PointWithinPolygons
          demografiData={demografiData}
          poiData={poiData}
          activeCounty={activeCounty}
          analizeActive={analizeActive}
          onChangePoiInPolygon={onChangePoiInPolygon}
          onChangeAnalize={onChangeAnalize}
          poiFilterProps="FASILITAS PENDIDIKAN"
          tipeFieldProps="TIPE_1"
          buttonText="Fasilitas Pendidikan"
        />
      </div>
    </div>
  );
};

export default PendidikanSection;
