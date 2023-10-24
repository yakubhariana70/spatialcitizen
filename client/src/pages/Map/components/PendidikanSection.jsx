import React, { useEffect, useState } from "react";
import TopicItem from "./TopicItem";
import RankChart from "./RankChart";

// || STYLE
import "./topicsection.css";

//|| ICON
import SDIcon from "../../../assets/icon/Pendidikan/sd.png";
import SMPIcon from "../../../assets/icon/Pendidikan/smp.png";
import SMAIcon from "../../../assets/icon/Pendidikan/sma.png";
import diplomaIcon from "../../../assets/icon/Pendidikan/diploma.png";
import sarjanaIcon from "../../../assets/icon/Pendidikan/sarjana.png";
import tenagapengajarIcon from "../../../assets/icon/Pendidikan/tenagapengajar.png";

const PendidikanSection = ({
  demografiData,
  activeCounty,
  activeLayer,
  onChangeLayer,
}) => {
  //Data Pendidikan
  const [tingkatPendidikan, setTingkatPendidikan] = useState(null);
  const [tenagaPengajar, setTenagaPengajar] = useState(null);

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
          "TENAGA PENGAJAR": tenaga_pengajar,
        } = grafikData.properties;

        const pendidikan = [sd, smp, sma, d1dand2, d3, s1, s2, s3];
        const tenagapengajar = [tenaga_pengajar];
        setTingkatPendidikan(pendidikan);
        setTenagaPengajar(tenagapengajar);
      }
    }
  }, [demografiData, activeCounty]);

  const [rankPendidikan, setRankPendidikan] = useState("TAMAT SD");

  return (
    <div>
      <section className="topic-container">
      <sub>
        <div className="sub-topic">Pendidikan</div>
      </sub>
        <TopicItem
          topicText={"Sekolah Dasar"}
          data={tingkatPendidikan && tingkatPendidikan[0]}
          label={"orang"}
          layer={"TAMAT SD"}
          icon={SDIcon}
          onChangeLayer={onChangeLayer}
          activeLayer={activeLayer}
          onChangeRank={setRankPendidikan}
        />
        <TopicItem
          topicText={"Sekolah Menengah Pertama"}
          data={tingkatPendidikan && tingkatPendidikan[1]}
          label={"orang"}
          layer={"SLTP"}
          icon={SMPIcon}
          onChangeLayer={onChangeLayer}
          activeLayer={activeLayer}
          onChangeRank={setRankPendidikan}
        />
        <TopicItem
          topicText={"Sekolah Menengah Atas"}
          data={tingkatPendidikan && tingkatPendidikan[2]}
          label={"orang"}
          layer={"SLTA"}
          icon={SMAIcon}
          onChangeLayer={onChangeLayer}
          activeLayer={activeLayer}
          onChangeRank={setRankPendidikan}
        />
        <div className="two-column">
          <TopicItem
            topicText={"D1 dan D2"}
            data={tingkatPendidikan && tingkatPendidikan[3]}
            label={"orang"}
            layer={"D1 DAN D2"}
            icon={diplomaIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankPendidikan}
          />
          <TopicItem
            topicText={"D3"}
            data={tingkatPendidikan && tingkatPendidikan[4]}
            label={"orang"}
            layer={"D3"}
            icon={diplomaIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankPendidikan}
          />
        </div>
        <div className="three-column">
          <TopicItem
            topicText={"S1"}
            data={tingkatPendidikan && tingkatPendidikan[5]}
            label={"orang"}
            layer={"S1"}
            icon={sarjanaIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankPendidikan}
          />
          <TopicItem
            topicText={"S2"}
            data={tingkatPendidikan && tingkatPendidikan[6]}
            label={"orang"}
            layer={"S2"}
            icon={sarjanaIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankPendidikan}
          />
          <TopicItem
            topicText={"S3"}
            data={tingkatPendidikan && tingkatPendidikan[7]}
            label={"orang"}
            layer={"S3"}
            icon={sarjanaIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankPendidikan}
          />
        </div>
        <TopicItem
          topicText={"Tenaga Pengajar"}
          data={tenagaPengajar && tenagaPengajar[0]}
          label={"orang"}
          layer={"TENAGA PENGAJAR"}
          icon={tenagapengajarIcon}
          onChangeLayer={onChangeLayer}
          activeLayer={activeLayer}
          onChangeRank={setRankPendidikan}
        />
        <RankChart
          demografiData={demografiData}
          activeCounty={activeCounty}
          selectedItem={rankPendidikan}
        />
      </section>
    </div>
  );
};

export default PendidikanSection;
