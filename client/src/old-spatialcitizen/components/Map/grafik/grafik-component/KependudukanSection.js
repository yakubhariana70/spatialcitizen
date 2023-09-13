import React, { useCallback, useEffect, useState } from "react";
import { VerticalBarChart } from "../BarChart";
import RankChart from "../RankChart";
import { useInView } from "react-intersection-observer";
// import * as Icon from "react-bootstrap-icons";

// || ICON 
import populasiIcon from "../../../image-assets/Icon/Kependudukan/populasi.png";
import kepalakeluargaIcon from "../../../image-assets/Icon/Kependudukan/kepala-keluarga.png";
import kepadatanIcon from "../../../image-assets/Icon/Kependudukan/kepadatan.png";
import pertumbuhanIcon from "../../../image-assets/Icon/Kependudukan/pertumbuhan.png";
import lakilakiIcon from "../../../image-assets/Icon/Kependudukan/laki-laki.png";
import perempuanIcon from "../../../image-assets/Icon/Kependudukan/perempuan.png";
import kawinIcon from "../../../image-assets/Icon/Kependudukan/love.png";
import belumKawinIcon from "../../../image-assets/Icon/Kependudukan/belum-kawin.png";
import ceraiHidupIcon from "../../../image-assets/Icon/Kependudukan/cerai.png";
import ceraiMatiIcon from "../../../image-assets/Icon/Kependudukan/cerai-mati.png";
import islamIcon from "../../../image-assets/Icon/Kependudukan/islam.png";
import kristenIcon from "../../../image-assets/Icon/Kependudukan/kristen.png";
import katolikIcon from "../../../image-assets/Icon/Kependudukan/katolik.png";
import hinduIcon from "../../../image-assets/Icon/Kependudukan/hindu.png";
import budhaIcon from "../../../image-assets/Icon/Kependudukan/budha.png";
import konghucuIcon from "../../../image-assets/Icon/Kependudukan/konghucu.png";
import tidakBekerjaIcon from "../../../image-assets/Icon/Kependudukan/tidak-bekerja.png";
import pelajarIcon from "../../../image-assets/Icon/Kependudukan/pelajar.png";
import wiraswastaIcon from "../../../image-assets/Icon/Kependudukan/wiraswasta.png";
import asnIcon from "../../../image-assets/Icon/Kependudukan/aparatur-negara.png";
import peternakIcon from "../../../image-assets/Icon/Kependudukan/peternak.png";
import pensiunanIcon from "../../../image-assets/Icon/Kependudukan/pensiunan.png";
import pekerjaanLainIcon from "../../../image-assets/Icon/Kependudukan/pekerjaan-lain.png";

const KependudukanSection = ({
  kependudukanRef,
  demografiData,
  activeCounty,
  onChangeLayer,
}) => {
  // Pengaturan Data Demografi
  // const [chartData, setChartData] = useState(null);

  //Data Kependudukan
  const [populasi, setPopulasi] = useState(null);
  const [kepalaKeluarga, setKepalaKeluarga] = useState(null);
  const [kepadatan, setKepadatan] = useState(null);
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
          "JUMLAH PENDUDUK": populasi,
          "JUMLAH KK": kk,
          "KEPADATAN PENDUDUK": kepadatan,
          "PERTUMBUHAN PENDUDUK TAHUN 2016 (%)": populationGrowth,

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

        // Menyimpan data lain untuk grafik sebagai array
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

        setPopulasi(populasi);
        setKepalaKeluarga(kk);
        setKepadatan(kepadatan);
        setPopulationGrowth(populationGrowth);

        const jenisKelaminChartData = {
          labels: ["LAKI-LAKI", "PEREMPUAN"],
          datasets: [
            {
              label: "Jenis Kelamin",
              data: jenis_kelamin,
              backgroundColor: ["#037FFF", "#29B7A4"],
            },
          ],
        };
        setJenisKelamin(jenisKelaminChartData);

        const statusPernikahanChartData = {
          labels: ["BELUM KAWIN", "KAWIN", "CERAI HIDUP", "CERAI MATI"],
          datasets: [
            {
              label: "Status Pernikahan",
              data: status_pernikahan,
              backgroundColor: ["#29B7A4", "#037FFF", "#062746", "#7E43F5"],
            },
          ],
        };
        setStatusPernikahan(statusPernikahanChartData);

        const agamaChartData = {
          labels: [
            "ISLAM",
            "KRISTEN",
            "KATHOLIK",
            "HINDU",
            "BUDHA",
            "KONGHUCU",
          ],
          datasets: [
            {
              label: "Agama",
              data: agama,
              backgroundColor: ["#29B7A4"],
            },
          ],
        };
        setAgama(agamaChartData);

        const usiaChartData = {
          labels: [
            "0-4 TAHUN",
            "5-9 TAHUN",
            "10-14 TAHUN",
            "15-19 TAHUN",
            "20-24 TAHUN",
            "25-29 TAHUN",
            "30-34 TAHUN",
            "35-39 TAHUN",
            "40-44 TAHUN",
            "45-49 TAHUN",
            "50-54 TAHUN",
            "55-59 TAHUN",
            "60-64 TAHUN",
            "65-69 TAHUN",
            "70-74 TAHUN",
            "75 TAHUN KE ATAS",
          ],
          datasets: [
            {
              label: "Usia",
              data: usia,
              backgroundColor: ["#29B7A4"],
            },
          ],
        };
        setUsia(usiaChartData);

        const profesiChartData = {
          labels: [
            "BELUM/TIDAK BEKERJA",
            "PELAJAR DAN MAHASISWA",
            "WIRASWASTA",
            "APARATUR PEJABAT NEGARA",
            "PERTANIAN DAN PETERNAKAN",
            "PENSIUNAN",
            "PEKERJAAN LAINNYA",
          ],
          datasets: [
            {
              label: "Profesi",
              data: profesi,
              backgroundColor: ["#29B7A4"],
            },
          ],
        };
        setProfesi(profesiChartData);
        // Manipulasi data GeoJSON ke format yang sesuai dengan komponen grafik yang Anda gunakan
        // const formattedData = {
        //   labels: demografiData.features.map(
        //     (feature) => feature.properties["DESA ATAU KELURAHAN"]
        //   ),
        //   datasets: [
        //     {
        //       label: "Jumlah Penduduk",
        //       data: demografiData.features.map(
        //         (feature) => feature.properties["JUMLAH PENDUDUK"]
        //       ),
        //       backgroundColor: ["green", "teal"],
        //     },
        //   ],
        // };
        // setChartData(formattedData);
      }
    }
  }, [demografiData, activeCounty]);

  //Pengaturan Deteksi Item
  const { ref: infoKependudukanRef, inView: infoKependudukanVisible } =
    useInView({ threshold: 0.75 });
  const { ref: jenisKelaminRef, inView: jenisKelaminVisible } = useInView({
    threshold: 0.75,
  });
  const { ref: agamaRef, inView: agamaVisible } = useInView({
    threshold: 0.75,
  });
  const { ref: usiaRef, inView: usiaVisible } = useInView({ threshold: 0.75 });
  const { ref: profesiRef, inView: profesiVisible } = useInView({
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
    if (infoKependudukanVisible) {
      handleScrollLayer("JUMLAH PENDUDUK");
    } else if (jenisKelaminVisible) {
      handleScrollLayer("LAKI-LAKI");
    } else if (agamaVisible) {
      handleScrollLayer("ISLAM");
    } else if (usiaVisible) {
      handleScrollLayer("USIA 0-4 TAHUN");
    } else if (profesiVisible) {
      handleScrollLayer("BELUM/TIDAK BEKERJA");
    }
  }, [
    infoKependudukanVisible,
    jenisKelaminVisible,
    agamaVisible,
    usiaVisible,
    profesiVisible,
    handleScrollLayer,
  ]);

  // || OPSI RANK DATA
  useEffect(() => {
    console.log("agama:", agama);
  }, [agama]);
  // Section Kependudukan
  const [rankAdministratif, setRankAdministratif] = useState("JUMLAH PENDUDUK");
  const [rankJenisKelamin, setRankJenisKelamin] = useState("LAKI-LAKI");
  const [rankAgama, setRankAgama] = useState("ISLAM");
  const [rankProfesi, setRankProfesi] = useState("BELUM/TIDAK BEKERJA");

  return (
    <div ref={kependudukanRef}>
      <div className="graph-item" ref={infoKependudukanRef}>
        <div
          className="info-container"

          onClick={() => {
            onChangeLayer("JUMLAH PENDUDUK");
            setRankAdministratif("JUMLAH PENDUDUK");
          }}
        >
          <div className="svg-icon border">
            <img src={populasiIcon} alt="populasi"/>
          </div>
          <div className="border ms-2">
            <span> Populasi </span>
            <br />
            <strong>{populasi} orang</strong>
          </div>
        </div>
        <div
          className="info-container"

          onClick={() => {
            onChangeLayer("JUMLAH KK");
            setRankAdministratif("JUMLAH KK");
          }}
        >
          <div className="svg-icon border">
          <img src={kepalakeluargaIcon} alt="kepala-keluarga"/>
          </div>
          <div className="border ms-2">
            <span> Kepala Keluarga </span>
            <br />
            <strong>{kepalaKeluarga} keluarga</strong>
          </div>
        </div>
        <div
          className="info-container"

          onClick={() => {
            onChangeLayer("KEPADATAN PENDUDUK");
            setRankAdministratif("KEPADATAN PENDUDUK");
          }}
        >
          <div className="svg-icon border">
            <img src={kepadatanIcon} alt="kepadatan-penduduk"/>
          </div>
          <div className="border ms-2">
            <span>Kepadatan Penduduk</span>
            <br />
            <strong>
              {kepadatan} orang/km<sup>2</sup>
            </strong>
          </div>
        </div>
        <div
          className="info-container"

          onClick={() => {
            onChangeLayer("PERTUMBUHAN PENDUDUK TAHUN 2016 (%)");
            setRankAdministratif("PERTUMBUHAN PENDUDUK TAHUN 2016 (%)");
          }}
        >
          <div className="svg-icon border">
          <img src={pertumbuhanIcon} alt="pertumbuhan-penduduk"/>
          </div>
          <div className="border ms-2">
            Pertumbuhan Penduduk
            <br />
            <strong>{populationGrowth} %</strong>
          </div>
        </div>
        <RankChart
          demografiData={demografiData}
          activeCounty={activeCounty}
          selectedItem={rankAdministratif}
        />
      </div>

      <div className="graph-item" id="g-jenis-kelamin" ref={jenisKelaminRef}>
        <h4>Jenis Kelamin</h4>
        {jenisKelamin && (
          <>
            <div
              className="info-container"
    
              onClick={() => {
                onChangeLayer("LAKI-LAKI");
                setRankJenisKelamin("LAKI-LAKI");
              }}
            >
              <div className="svg-icon border">
              <img src={lakilakiIcon} alt="laki-laki"/>
              </div>
              <div className="border ms-2">
                <span> Laki-Laki </span>
                <br />
                <strong> {jenisKelamin.datasets[0].data[0]} orang</strong>
              </div>
            </div>
            <div
              className="info-container"
    
              onClick={() => {
                onChangeLayer("PEREMPUAN");
                setRankJenisKelamin("PEREMPUAN");
              }}
            >
              <div className="svg-icon border">
              <img src={perempuanIcon} alt="perempuan"/>
              </div>
              <div className="border ms-2">
                <span> Perempuan </span>
                <br />
                <strong> {jenisKelamin.datasets[0].data[1]} orang</strong>
              </div>
            </div>
            <h4>Status Pernikahan</h4>
            <div className="two-column">
              <div
                className="info-container"
      
                onClick={() => {
                  onChangeLayer("KAWIN");
                  setRankJenisKelamin("KAWIN");
                }}
              >
                <div className="svg-icon border">
                <img src={kawinIcon} alt="kawin"/>
                </div>
                <div className="border ms-2">
                  <span> Kawin </span>
                  <br />
                  <strong> {statusPernikahan.datasets[0].data[0]} orang</strong>
                </div>
              </div>
              <div
                className="info-container"
      
                onClick={() => {
                  onChangeLayer("BELUM KAWIN");
                  setRankJenisKelamin("BELUM KAWIN");
                }}
              >
                <div className="svg-icon border">
                <img src={belumKawinIcon} alt="belum-kawin"/>
                </div>
                <div className="border ms-2">
                  <span> Belum Kawin </span>
                  <br />
                  <strong> {statusPernikahan.datasets[0].data[1]} orang</strong>
                </div>
              </div>
              <div
                className="info-container"
      
                onClick={() => {
                  onChangeLayer("CERAI HIDUP");
                  setRankJenisKelamin("CERAI HIDUP");
                }}
              >
                <div className="svg-icon border">
                <img src={ceraiHidupIcon} alt="cerai-hidup"/>
                </div>
                <div className="border ms-2">
                  <span> Cerai Hidup </span>
                  <br />
                  <strong> {statusPernikahan.datasets[0].data[2]} orang</strong>
                </div>
              </div>
              <div
                className="info-container"
      
                onClick={() => {
                  onChangeLayer("CERAI MATI");
                  setRankJenisKelamin("CERAI MATI");
                }}
              >
                <div className="svg-icon border">
                <img src={ceraiMatiIcon} alt="cerai-mati"/>
                </div>
                <div className="border ms-2">
                  <span> Cerai Mati </span>
                  <br />
                  <strong> {statusPernikahan.datasets[0].data[3]} orang</strong>
                </div>
              </div>
            </div>
            <RankChart
              demografiData={demografiData}
              activeCounty={activeCounty}
              selectedItem={rankJenisKelamin}
            />
          </>
        )}
      </div>
      <div className="graph-item" id="g-agama" ref={agamaRef}>
        <h4>Agama</h4>
        {agama && (
          <>
            <div className="two-column">
              <div
                className="info-container"
      
                onClick={() => {
                  onChangeLayer("ISLAM");
                  setRankAgama("ISLAM");
                }}
              >
                <div className="svg-icon border">
                <img src={islamIcon} alt="islam"/>
                </div>
                <div className="border ms-2">
                  <span> Islam </span>
                  <br />
                  <strong> {agama.datasets[0].data[0]} orang</strong>
                </div>
              </div>
              <div
                className="info-container"
      
                onClick={() => {
                  onChangeLayer("KRISTEN");
                  setRankAgama("KRISTEN");
                }}
              >
                <div className="svg-icon border">
                <img src={kristenIcon} alt="kristen"/>
                </div>
                <div className="border ms-2">
                  <span> Kristen </span>
                  <br />
                  <strong> {agama.datasets[0].data[1]} orang</strong>
                </div>
              </div>
              <div
                className="info-container"
      
                onClick={() => {
                  onChangeLayer("KATHOLIK");
                  setRankAgama("KATHOLIK");
                }}
              >
                <div className="svg-icon border">
                <img src={katolikIcon} alt="katolik"/>
                </div>
                <div className="border ms-2">
                  <span> Katolik </span>
                  <br />
                  <strong> {agama.datasets[0].data[2]} orang</strong>
                </div>
              </div>
              <div
                className="info-container"
      
                onClick={() => {
                  onChangeLayer("HINDU");
                  setRankAgama("HINDU");
                }}
              >
                <div className="svg-icon border">
                <img src={hinduIcon} alt="hindu"/>
                </div>
                <div className="border ms-2">
                  <span> Hindu </span>
                  <br />
                  <strong> {agama.datasets[0].data[3]} orang</strong>
                </div>
              </div>
              <div
                className="info-container"
      
                onClick={() => {
                  onChangeLayer("BUDHA");
                  setRankAgama("BUDHA");
                }}
              >
                <div className="svg-icon border">
                <img src={budhaIcon} alt="budha"/>
                </div>
                <div className="border ms-2">
                  <span> Budha </span>
                  <br />
                  <strong> {agama.datasets[0].data[4]} orang</strong>
                </div>
              </div>
              <div
                className="info-container"
      
                onClick={() => {
                  onChangeLayer("KONGHUCU");
                  setRankAgama("KONGHUCU");
                }}
              >
                <div className="svg-icon border">
                <img src={konghucuIcon} alt="konghucu"/>
                </div>
                <div className="border ms-2">
                  <span> Konghucu </span>
                  <br />
                  <strong> {agama.datasets[0].data[5]} orang</strong>
                </div>
              </div>
            </div>
            <RankChart
              demografiData={demografiData}
              activeCounty={activeCounty}
              selectedItem={rankAgama}
            />
          </>
        )}
      </div>
      <div className="graph-item" id="g-usia" ref={usiaRef}>
        <h4>Distribusi Usia</h4>
        {usia && <VerticalBarChart verticalData={usia} />}
      </div>

      <div className="graph-item" id="g-profesi" ref={profesiRef}>
        <h4>Profesi Penduduk</h4>
        {profesi && (
          <>
            <div className="two-column">
              <div
                className="info-container"
      
                onClick={() => {
                  onChangeLayer("BELUM/TIDAK BEKERJA");
                  setRankProfesi("BELUM/TIDAK BEKERJA");
                }}
              >
                <div className="svg-icon border">
                <img src={tidakBekerjaIcon} alt="tidak-bekerja"/>
                </div>
                <div className="info-text border ms-2">
                  <span> Belum/ Tidak Bekerja </span>
                  <br />
                  <strong> {profesi.datasets[0].data[0]} orang</strong>
                </div>
              </div>
              <div
                className="info-container"
      
                onClick={() => {
                  onChangeLayer("PELAJAR DAN MAHASISWA");
                  setRankProfesi("PELAJAR DAN MAHASISWA");
                }}
              >
                <div className="svg-icon border">
                <img src={pelajarIcon} alt="pelajar-mahasiswa"/>
                </div>
                <div className="info-text border ms-2">
                  <span> Pelajar dan Mahasiswa </span>
                  <br />
                  <strong> {profesi.datasets[0].data[1]} orang</strong>
                </div>
              </div>
              <div
                className="info-container"
      
                onClick={() => {
                  onChangeLayer("WIRASWASTA");
                  setRankProfesi("WIRASWASTA");
                }}
              >
                <div className="svg-icon border">
                <img src={wiraswastaIcon} alt="wiraswasta"/>
                </div>
                <div className="info-text border ms-2">
                  <span> Wiraswasta </span>
                  <br />
                  <strong> {profesi.datasets[0].data[2]} orang</strong>
                </div>
              </div>
              <div
                className="info-container"
      
                onClick={() => {
                  onChangeLayer("APARATUR PEJABAT NEGARA");
                  setRankProfesi("APARATUR PEJABAT NEGARA");
                }}
              >
                <div className="svg-icon border">
                <img src={asnIcon} alt="aparatur-negara"/>
                </div>
                <div className="info-text border ms-2">
                  <span> Aparatur Negara </span>
                  <br />
                  <strong> {profesi.datasets[0].data[3]} orang</strong>
                </div>
              </div>
              <div
                className="info-container"
                style={{ height: "3rem"}}
                onClick={() => {
                  onChangeLayer("Pertanian dan Peternakan");
                  setRankProfesi("Pertanian dan Peternakan");
                }}
              >
                <div className="svg-icon border">
                <img src={peternakIcon} alt="petani-peternak"/>
                </div>
                <div className="info-text border ms-2">
                  <span> Pertanian dan Peternakan </span>
                  <br />
                  <strong> {profesi.datasets[0].data[4]} orang</strong>
                </div>
              </div>
              <div
                className="info-container"
      
                onClick={() => {
                  onChangeLayer("PENSIUNAN");
                  setRankProfesi("PENSIUNAN");
                }}
              >
                <div className="svg-icon border">
                <img src={pensiunanIcon} alt="pensiunan"/>
                </div>
                <div className="info-text border ms-2">
                  <span> Pensiunan </span>
                  <br />
                  <strong> {profesi.datasets[0].data[5]} orang</strong>
                </div>
              </div>
              <div
                className="info-container"
      
                onClick={() => {
                  onChangeLayer("PEKERJAAN LAINNYA");
                  setRankProfesi("PEKERJAAN LAINNYA");
                }}
              >
                <div className="svg-icon border">
                <img src={pekerjaanLainIcon} alt="pekerjaan-lain"/>
                </div>
                <div className="info-text border ms-2">
                  <span> Pekerjaan Lainnya </span>
                  <br />
                  <strong> {profesi.datasets[0].data[6]} orang</strong>
                </div>
              </div>
            </div>
            <RankChart
              demografiData={demografiData}
              activeCounty={activeCounty}
              selectedItem={rankProfesi}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default KependudukanSection;
