import React, { useEffect, useState } from "react";
import TopicItem from "./TopicItem";
import RankChart from "./RankChart";

// || STYLE
import "./topicsection.css";

//|| ICON
import luasWilayahIcon from "../../../assets/icon/Geografis/luas-wilayah.png";
// import ketinggianTanahIcon from "../../../assets/icon/Geografis/ketinggian-tanah.png";
const GeografisSection = ({demografiData, activeCounty, activeLayer, onChangeLayer}) => {
  // State Data Kependudukan
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
        setLuasWilayah(array_lw);
      }
    }
  }, [demografiData, activeCounty]);

  const [rankGeografis, setRankGeografis] = useState("JUMLAH PENDUDUK");

  return (
    <div>
      <section className="topic-container">
        <TopicItem
          topicText={"Luas Wilayah"}
          data={luasWilayah && luasWilayah[0]}
          label={"km2"}
          icon={luasWilayahIcon}
          layer={"LUAS WILAYAH (KM2)"}
          activeLayer={activeLayer}
          onChangeLayer={onChangeLayer}
          onChangeRank={setRankGeografis}
        />
        {/* <TopicItem
          topicText={"Ketinggian Tanah"}
          data={luasWilayah && luasWilayah[0]}
          label={"orang"}
          icon={ketinggianTanahIcon}
          layer={"LUAS WILAYAH (KM2)"}
          activeLayer={activeLayer}
          onChangeLayer={onChangeLayer}
          onChangeRank={setRankGeografis}
        /> */}
        <RankChart
          demografiData={demografiData}
          activeCounty={activeCounty}
          selectedItem={rankGeografis}
        />
      </section>
    </div>
  );
};

export default GeografisSection;
