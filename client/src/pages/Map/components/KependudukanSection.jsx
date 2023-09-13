import React, { useEffect, useState } from "react";
import TopicItem from "./TopicItem";
import RankChart from "./RankChart";

// || STYLE
import "./topicsection.css";

//|| ICON
import populasiIcon from "../../../assets/icon/Kependudukan/populasi.png";
import kepalakeluargaIcon from "../../../assets/icon/Kependudukan/kepala-keluarga.png";
import kepadatanIcon from "../../../assets/icon/Kependudukan/kepadatan.png";
import pertumbuhanIcon from "../../../assets/icon/Kependudukan/pertumbuhan.png";
import lakilakiIcon from "../../../assets/icon/Kependudukan/laki-laki.png";
import perempuanIcon from "../../../assets/icon/Kependudukan/perempuan.png";
import kawinIcon from "../../../assets/icon/Kependudukan/love.png";
import belumKawinIcon from "../../../assets/icon/Kependudukan/belum-kawin.png";
import ceraiHidupIcon from "../../../assets/icon/Kependudukan/cerai.png";
import ceraiMatiIcon from "../../../assets/icon/Kependudukan/cerai-mati.png";
import islamIcon from "../../../assets/icon/Kependudukan/islam.png";
import kristenIcon from "../../../assets/icon/Kependudukan/kristen.png";
import katolikIcon from "../../../assets/icon/Kependudukan/katolik.png";
import hinduIcon from "../../../assets/icon/Kependudukan/hindu.png";
import budhaIcon from "../../../assets/icon/Kependudukan/budha.png";
import konghucuIcon from "../../../assets/icon/Kependudukan/konghucu.png";
import tidakBekerjaIcon from "../../../assets/icon/Kependudukan/tidak-bekerja.png";
import pelajarIcon from "../../../assets/icon/Kependudukan/pelajar.png";
import wiraswastaIcon from "../../../assets/icon/Kependudukan/wiraswasta.png";
import asnIcon from "../../../assets/icon/Kependudukan/aparatur-negara.png";
import peternakIcon from "../../../assets/icon/Kependudukan/peternak.png";
import pensiunanIcon from "../../../assets/icon/Kependudukan/pensiunan.png";
import pekerjaanLainIcon from "../../../assets/icon/Kependudukan/pekerjaan-lain.png";
import usia04Icon from "../../../assets/icon/Kependudukan/Usia-04.svg";
import usia59Icon from "../../../assets/icon/Kependudukan/Usia-59.svg";
import usia1014Icon from "../../../assets/icon/Kependudukan/Usia-1014.svg";
import usia1519Icon from "../../../assets/icon/Kependudukan/Usia-1519.svg";
import usia2024Icon from "../../../assets/icon/Kependudukan/Usia-2024.svg";
import usia2529Icon from "../../../assets/icon/Kependudukan/Usia-2529.svg";
import usia3034Icon from "../../../assets/icon/Kependudukan/Usia-3034.svg";
import usia3539Icon from "../../../assets/icon/Kependudukan/Usia-3539.svg";
import usia4044Icon from "../../../assets/icon/Kependudukan/Usia-4044.svg";
import usia4549Icon from "../../../assets/icon/Kependudukan/Usia-4549.svg";
import usia5054Icon from "../../../assets/icon/Kependudukan/Usia-5054.svg";
import usia5559Icon from "../../../assets/icon/Kependudukan/Usia-5559.svg";
import usia6064Icon from "../../../assets/icon/Kependudukan/Usia-6064.svg";
import usia6569Icon from "../../../assets/icon/Kependudukan/Usia-6569.svg";
import usia7074Icon from "../../../assets/icon/Kependudukan/Usia-7074.svg";
import usia75Icon from "../../../assets/icon/Kependudukan/Usia-75.svg";

const KependudukanSection = ({
  demografiData,
  activeCounty,
  activeLayer,
  onChangeLayer,
}) => {
  // State Data Kependudukan
  const [kependudukanUmum, setKependudukanUmum] = useState(null);
  const [populationGrowth, setPopulationGrowth] = useState(null);
  const [jenisKelamin, setJenisKelamin] = useState(null);
  const [statusPernikahan, setStatusPernikahan] = useState(null);
  const [agama, setAgama] = useState(null);
  const [usia, setUsia] = useState(null);
  const [profesi, setProfesi] = useState(null);

  useEffect(() => {
    if (demografiData) {
      //Fungsi event listener active County
      const grafikData = demografiData.features.find(
        (p) => p.properties["DESA ATAU KELURAHAN"] === activeCounty
      );
      // Destructuring Properti Kependudukan
      if (grafikData) {
        const {
          //Kependudukan Umum
          "JUMLAH PENDUDUK": populasi,
          "JUMLAH KK": kk,
          "KEPADATAN PENDUDUK": kepadatan,
          // Pertumbuhan Penduduk
          "PERTUMBUHAN PENDUDUK TAHUN 2016 (%)": populationGrowth2016,
          "PERTUMBUHAN PENDUDUK TAHUN 2017 (%)": populationGrowth2017,
          "PERTUMBUHAN PENDUDUK TAHUN 2018 (%)": populationGrowth2018,

          // Jenis Kelamin
          "LAKI-LAKI": laki_laki,
          PEREMPUAN: perempuan,

          //Status Pernikahan
          "BELUM KAWIN": belum_kawin,
          KAWIN: kawin,
          "CERAI HIDUP": cerai_hidup,
          "CERAI MATI": cerai_mati,

          //Agama
          ISLAM: islam,
          KRISTEN: kristen,
          KATHOLIK: katholik,
          HINDU: hindu,
          BUDHA: budha,
          KONGHUCU: konghucu,

          //Usia
          "USIA 0-4 TAHUN": usia_0_4,
          "USIA 5-9 TAHUN": usia_5_9,
          "USIA 10-14 TAHUN": usia_10_14,
          "USIA 15-19 TAHUN": usia_15_19,
          "USIA 20-24 TAHUN": usia_20_24,
          "USIA 25-29 TAHUN": usia_25_29,
          "USIA 30-34 TAHUN": usia_30_34,
          "USIA 35-39 TAHUN": usia_35_39,
          "USIA 40-44 TAHUN": usia_40_44,
          "USIA 45-49 TAHUN": usia_45_49,
          "USIA 50-54 TAHUN": usia_50_54,
          "USIA 55-59 TAHUN": usia_55_59,
          "USIA 60-64 TAHUN": usia_60_64,
          "USIA 65-69 TAHUN": usia_65_69,
          "USIA 70-74 TAHUN": usia_70_74,
          "USIA 75 TAHUN KE ATAS": usia_75,

          //Profesi
          "BELUM/TIDAK BEKERJA": tidak_bekerja,
          "PELAJAR DAN MAHASISWA": pelajar,
          WIRASWASTA: wiraswasta,
          "APARATUR PEJABAT NEGARA": asn,
          "PERTANIAN DAN PETERNAKAN": petani_peternak,
          PENSIUNAN: pensiun,
          "PEKERJAAN LAINNYA": pekerjaan_lain,
        } = grafikData.properties;

        // Menyimpan data sebagai objek
        const kependudukan_umum = [populasi, kk, kepadatan];
        const pertumbuhan_penduduk = [
          populationGrowth2016,
          populationGrowth2017,
          populationGrowth2018,
        ];
        const jenis_kelamin = [laki_laki, perempuan];
        const status_pernikahan = [belum_kawin, kawin, cerai_hidup, cerai_mati];
        const agama = [islam, kristen, katholik, hindu, budha, konghucu];
        const usia = [
          usia_0_4,
          usia_5_9,
          usia_10_14,
          usia_15_19,
          usia_20_24,
          usia_25_29,
          usia_30_34,
          usia_35_39,
          usia_40_44,
          usia_45_49,
          usia_50_54,
          usia_55_59,
          usia_60_64,
          usia_65_69,
          usia_70_74,
          usia_75,
        ];
        const profesi = [
          tidak_bekerja,
          pelajar,
          wiraswasta,
          asn,
          petani_peternak,
          pensiun,
          pekerjaan_lain,
        ];
        //Set variabel data dalam state
        setKependudukanUmum(kependudukan_umum);
        setPopulationGrowth(pertumbuhan_penduduk);
        setJenisKelamin(jenis_kelamin);
        setStatusPernikahan(status_pernikahan);
        setAgama(agama);
        setUsia(usia);
        setProfesi(profesi);
      }
    }
  }, [demografiData, activeCounty]);

  // State Grafik Ranking
  const [rankAdministratif, setRankAdministratif] = useState("JUMLAH PENDUDUK");
  const [rankKelaminStatus, setRankKelaminStatus] = useState("LAKI-LAKI");
  const [rankUsia, setRankUsia] = useState("USIA 0-4 TAHUN");
  const [rankAgama, setRankAgama] = useState("ISLAM");
  const [rankProfesi, setRankProfesi] = useState("BELUM/TIDAK BEKERJA");
  return (
    <div>
      <section className="topic-container">
        <TopicItem
          topicText={"Populasi"}
          data={kependudukanUmum && kependudukanUmum[0]}
          label={"orang"}
          layer={"JUMLAH PENDUDUK"}
          icon={populasiIcon}
          onChangeLayer={onChangeLayer}
          activeLayer={activeLayer}
          onChangeRank={setRankAdministratif}
        />
        <TopicItem
          topicText={"Kepala Keluarga"}
          data={kependudukanUmum && kependudukanUmum[1]}
          label={"keluarga"}
          layer={"JUMLAH KK"}
          icon={kepalakeluargaIcon}
          onChangeLayer={onChangeLayer}
          activeLayer={activeLayer}
          onChangeRank={setRankAdministratif}
        />
        <TopicItem
          topicText={"Kepadatan Penduduk"}
          data={kependudukanUmum && kependudukanUmum[2]}
          label={"orang/km2"}
          layer={"KEPADATAN PENDUDUK"}
          icon={kepadatanIcon}
          onChangeLayer={onChangeLayer}
          activeLayer={activeLayer}
          onChangeRank={setRankAdministratif}
        />
        <div className="three-column">
          <TopicItem
            topicText={"2016"}
            data={populationGrowth && populationGrowth[0]}
            label={"%"}
            layer={"PERTUMBUHAN PENDUDUK TAHUN 2016 (%)"}
            icon={pertumbuhanIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankAdministratif}
          />
          <TopicItem
            topicText={"2017"}
            data={populationGrowth && populationGrowth[1]}
            label={"%"}
            layer={"PERTUMBUHAN PENDUDUK TAHUN 2017 (%)"}
            icon={pertumbuhanIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankAdministratif}
          />
          <TopicItem
            topicText={"2018"}
            data={populationGrowth && populationGrowth[2]}
            label={"%"}
            layer={"PERTUMBUHAN PENDUDUK TAHUN 2018 (%)"}
            icon={pertumbuhanIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankAdministratif}
          />
          <RankChart
            demografiData={demografiData}
            activeCounty={activeCounty}
            selectedItem={rankAdministratif}
          />
        </div>
      </section>
      <section className="topic-container">
        <div className="two-column">
          <TopicItem
            topicText={"Laki-Laki"}
            data={jenisKelamin && jenisKelamin[0]}
            label={"orang"}
            layer={"LAKI-LAKI"}
            icon={lakilakiIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankKelaminStatus}
          />
          <TopicItem
            topicText={"Perempuan"}
            data={jenisKelamin && jenisKelamin[1]}
            label={"orang"}
            layer={"PEREMPUAN"}
            icon={perempuanIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankKelaminStatus}
          />
        </div>
        <div className="two-column">
          <TopicItem
            topicText={"Belum Kawin"}
            data={statusPernikahan && statusPernikahan[0]}
            label={"orang"}
            layer={"BELUM KAWIN"}
            icon={belumKawinIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankKelaminStatus}
          />
          <TopicItem
            topicText={"Kawin"}
            data={statusPernikahan && statusPernikahan[1]}
            label={"orang"}
            layer={"KAWIN"}
            icon={kawinIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankKelaminStatus}
          />
          <TopicItem
            topicText={"Cerai Hidup"}
            data={statusPernikahan && statusPernikahan[2]}
            label={"orang"}
            layer={"CERAI HIDUP"}
            icon={ceraiHidupIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankKelaminStatus}
          />
          <TopicItem
            topicText={"Cerai Mati"}
            data={statusPernikahan && statusPernikahan[3]}
            label={"orang"}
            layer={"CERAI MATI"}
            icon={ceraiMatiIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankKelaminStatus}
          />
        </div>
        <RankChart
          demografiData={demografiData}
          activeCounty={activeCounty}
          selectedItem={rankKelaminStatus}
        />
      </section>
      <section className="topic-container">
        <div className="two-column">
          <TopicItem
            topicText={"0-4 Tahun"}
            data={usia && usia[0]}
            label={"orang"}
            layer={"USIA 0-4 TAHUN"}
            icon={usia04Icon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankUsia}
          />
          <TopicItem
            topicText={"5-9 Tahun"}
            data={usia && usia[1]}
            label={"orang"}
            layer={"USIA 5-9 TAHUN"}
            icon={usia59Icon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankUsia}
          />
          <TopicItem
            topicText={"10-14 Tahun"}
            data={usia && usia[2]}
            label={"orang"}
            layer={"USIA 10-14 TAHUN"}
            icon={usia1014Icon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankUsia}
          />
          <TopicItem
            topicText={"15-19 Tahun"}
            data={usia && usia[3]}
            label={"orang"}
            layer={"USIA 15-19 TAHUN"}
            icon={usia1519Icon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankUsia}
          />
          <TopicItem
            topicText={"20-24 Tahun"}
            data={usia && usia[4]}
            label={"orang"}
            layer={"USIA 20-24 TAHUN"}
            icon={usia2024Icon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankUsia}
          />
          <TopicItem
            topicText={"25-29 Tahun"}
            data={usia && usia[5]}
            label={"orang"}
            layer={"USIA 25-29 TAHUN"}
            icon={usia2529Icon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankUsia}
          />
          <TopicItem
            topicText={"30-34 Tahun"}
            data={usia && usia[6]}
            label={"orang"}
            layer={"USIA 30-34 TAHUN"}
            icon={usia3034Icon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankUsia}
          />
          <TopicItem
            topicText={"35-39 Tahun"}
            data={usia && usia[7]}
            label={"orang"}
            layer={"USIA 35-39 TAHUN"}
            icon={usia3539Icon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankUsia}
          />
          <TopicItem
            topicText={"40-44 Tahun"}
            data={usia && usia[8]}
            label={"orang"}
            layer={"USIA 40-44 TAHUN"}
            icon={usia4044Icon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankUsia}
          />
          <TopicItem
            topicText={"45-49 Tahun"}
            data={usia && usia[9]}
            label={"orang"}
            layer={"USIA 45-49 TAHUN"}
            icon={usia4549Icon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankUsia}
          />
          <TopicItem
            topicText={"50-54 Tahun"}
            data={usia && usia[10]}
            label={"orang"}
            layer={"USIA 50-54 TAHUN"}
            icon={usia5054Icon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankUsia}
          />
          <TopicItem
            topicText={"55-59 Tahun"}
            data={usia && usia[11]}
            label={"orang"}
            layer={"USIA 55-59 TAHUN"}
            icon={usia5559Icon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankUsia}
          />
          <TopicItem
            topicText={"60-64 Tahun"}
            data={usia && usia[12]}
            label={"orang"}
            layer={"USIA 60-64 TAHUN"}
            icon={usia6064Icon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankUsia}
          />
          <TopicItem
            topicText={"65-69 Tahun"}
            data={usia && usia[13]}
            label={"orang"}
            layer={"USIA 65-69 TAHUN"}
            icon={usia6569Icon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankUsia}
          />
          <TopicItem
            topicText={"70-74 Tahun"}
            data={usia && usia[14]}
            label={"orang"}
            layer={"USIA 70-74 TAHUN"}
            icon={usia7074Icon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankUsia}
          />
          <TopicItem
            topicText={">75 Tahun"}
            data={usia && usia[15]}
            label={"orang"}
            layer={"USIA 75 TAHUN KE ATAS"}
            icon={usia75Icon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankUsia}
          />
        </div>
        <RankChart
          demografiData={demografiData}
          activeCounty={activeCounty}
          selectedItem={rankUsia}
        />
      </section>
      <section className="topic-container">
        <div className="two-column">
          <TopicItem
            topicText={"Islam"}
            data={agama && agama[0]}
            label={"orang"}
            layer={"ISLAM"}
            icon={islamIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankAgama}
          />
          <TopicItem
            topicText={"Kristen"}
            data={agama && agama[1]}
            label={"orang"}
            layer={"KRISTEN"}
            icon={kristenIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankAgama}
          />
          <TopicItem
            topicText={"Katholik"}
            data={agama && agama[2]}
            label={"orang"}
            layer={"KATHOLIK"}
            icon={katolikIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankAgama}
          />
          <TopicItem
            topicText={"Hindu"}
            data={agama && agama[3]}
            label={"orang"}
            layer={"HINDU"}
            icon={hinduIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankAgama}
          />
          <TopicItem
            topicText={"Budha"}
            data={agama && agama[4]}
            label={"orang"}
            layer={"BUDHA"}
            icon={budhaIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankAgama}
          />
          <TopicItem
            topicText={"Konghucu"}
            data={agama && agama[5]}
            label={"orang"}
            layer={"KONGHUCU"}
            icon={konghucuIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankAgama}
          />
        </div>
        <RankChart
          demografiData={demografiData}
          activeCounty={activeCounty}
          selectedItem={rankAgama}
        />
      </section>
      <section className="topic-container">
        <div className="two-column">
          <TopicItem
            topicText={"Belum/Tidak Bekerja"}
            data={profesi && profesi[0]}
            label={"orang"}
            layer={"BELUM/TIDAK BEKERJA"}
            icon={tidakBekerjaIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankProfesi}
          />
          <TopicItem
            topicText={"Pelajar dan Mahasiswa"}
            data={profesi && profesi[1]}
            label={"orang"}
            layer={"PELAJAR DAN MAHASISWA"}
            icon={pelajarIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankProfesi}
          />
          <TopicItem
            topicText={"Wiraswasta"}
            data={profesi && profesi[2]}
            label={"orang"}
            layer={"WIRASWASTA"}
            icon={wiraswastaIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankProfesi}
          />
          <TopicItem
            topicText={"Aparatur Pejabat Negara"}
            data={profesi && profesi[3]}
            label={"orang"}
            layer={"APARATUR PEJABAT NEGARA"}
            icon={asnIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankProfesi}
          />
          <TopicItem
            topicText={"Pertanian dan Peternakan"}
            data={profesi && profesi[4]}
            label={"orang"}
            layer={"PERTANIAN DAN PETERNAKAN"}
            icon={peternakIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankProfesi}
          />
          <TopicItem
            topicText={"Pensiunan"}
            data={profesi && profesi[5]}
            label={"orang"}
            layer={"PENSIUNAN"}
            icon={pensiunanIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankProfesi}
          />
          <TopicItem
            topicText={"Pekerjaan Lainnya"}
            data={profesi && profesi[6]}
            label={"orang"}
            layer={"PEKERJAAN LAINNYA"}
            icon={pekerjaanLainIcon}
            onChangeLayer={onChangeLayer}
            activeLayer={activeLayer}
            onChangeRank={setRankProfesi}
          />
        </div>
        <RankChart
          demografiData={demografiData}
          activeCounty={activeCounty}
          selectedItem={rankProfesi}
        />
      </section>
    </div>
  );
};

export default KependudukanSection;
