import React, { useEffect, useState } from "react";
import TopicItem from "./TopicItem";
import RankChart from "./RankChart";

// || STYLE
import "./topicsection.css";

//|| ICON
import goldarAIcon from "../../../assets/icon/Kesehatan/goldar-A.png";
import goldarBIcon from "../../../assets/icon/Kesehatan/goldar-B.png";
import goldarABIcon from "../../../assets/icon/Kesehatan/goldar-AB.png";
import goldarOIcon from "../../../assets/icon/Kesehatan/goldar-O.png";
import tenagakesehatanIcon from "../../../assets/icon/Kesehatan/tenaga-kesehatan.png";

const KesehatanSection = ({
  demografiData,
  activeCounty,
  activeLayer,
  onChangeLayer,
}) => {
  //Data Kesehatan
  const [golonganDarah, setGolonganDarah] = useState(null);
  const [tenagaKesehatan, setTenagakesehatan] = useState(null);

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
          "TENAGA KESEHATAN": tenaga_kesehatan,
        } = grafikData.properties;

        const golDar = [goldar_A, goldar_B, goldar_AB, goldar_O];
        const tenKes = [tenaga_kesehatan];

        setGolonganDarah(golDar);
        setTenagakesehatan(tenKes);
      }
    }
  }, [demografiData, activeCounty]);

  //|| Diagram Kesehatan
  const [rankKesehatan, setRankKesehatan] = useState("GOLONGAN DARAH A");

  return (
    <div>
      <section className="topic-container">
      <sub>
        <div className="sub-topic">Kesehatan</div>
      </sub>
        <div className="two-column">
          <TopicItem
            topicText={"Golongan Darah A"}
            data={golonganDarah && golonganDarah[0]}
            label={"orang"}
            layer={"GOLONGAN DARAH A"}
            icon={goldarAIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankKesehatan}
          />
          <TopicItem
            topicText={"Golongan Darah B"}
            data={golonganDarah && golonganDarah[1]}
            label={"orang"}
            layer={"GOLONGAN DARAH B"}
            icon={goldarBIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankKesehatan}
          />
          <TopicItem
            topicText={"Golongan Darah AB"}
            data={golonganDarah && golonganDarah[2]}
            label={"orang"}
            layer={"GOLONGAN DARAH AB"}
            icon={goldarABIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankKesehatan}
          />
          <TopicItem
            topicText={"Golongan Darah O"}
            data={golonganDarah && golonganDarah[3]}
            label={"orang"}
            layer={"GOLONGAN DARAH O"}
            icon={goldarOIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankKesehatan}
          />
        </div>
        <TopicItem
          topicText={"Tenaga Kesehatan"}
          data={tenagaKesehatan && tenagaKesehatan[0]}
          label={"orang"}
          layer={"TENAGA KESEHATAN"}
          icon={tenagakesehatanIcon}
          onChangeLayer={onChangeLayer}
          activeLayer={activeLayer}
          onChangeRank={setRankKesehatan}
        />
        <RankChart
          demografiData={demografiData}
          activeCounty={activeCounty}
          selectedItem={rankKesehatan}
        />
      </section>
    </div>
  );
};

export default KesehatanSection;
