import React, { useCallback, useEffect, useState } from "react";
import * as turf from "@turf/turf";
import { Dropdown, DropdownButton } from "react-bootstrap";

// || ICON
import analisisIcon from "../../../assets/icon/MapboxSection/analisisspasial.svg";
import pendidikanIcon from "../../../assets/icon/MapboxSection/pendidikan.png";
import kesehatanIcon from "../../../assets/icon/MapboxSection/kesehatan.png";

const SpatialAnalyze = ({
  demografiData,
  poiData,
  activeCounty,
  analizeActive,
  onChangeAnalyze,
  onChangePoiInPolygon,
}) => {
  // || ANALISIS SPASIAL

  const [poiFilter, setPoiFilter] = useState(null);
  const [tipeField, setTipeField] = useState(null);

  const filterPoiByType = useCallback(
    (filterType, poiGeoJSON) => {
      return poiGeoJSON.features.filter((feature) => {
        // Sesuaikan properti atau field yang digunakan untuk filter
        return filterType.includes(feature.properties[tipeField]);
      });
    },
    [tipeField]
  );

  // Fungsi untuk menampilkan poin di dalam poligon county aktif
  const showPointInActiveCounty = useCallback(() => {
    if (
      analizeActive &&
      activeCounty &&
      poiData &&
      poiData.features &&
      demografiData &&
      demografiData.features
    ) {
      // Ambil geometri county aktif
      const activeCountyFeature = demografiData.features.find((feature) => {
        return feature.properties["DESA ATAU KELURAHAN"] === activeCounty;
      });

      if (activeCountyFeature) {
        // Buat poligon dari geometri county aktif
        const activeCountyPolygon = turf.polygon(
          activeCountyFeature.geometry.coordinates[0]
        );

        console.log("activeCountyPolygon", activeCountyPolygon);
        // Melakukan filter berdasarkan layer
        const filteredPoi = filterPoiByType(poiFilter, poiData);

        const points = filteredPoi.map((feature) =>
          turf.point(feature.geometry.coordinates)
        );
        const turfPoints = turf.featureCollection(points);
        console.log("turfPoints:", turfPoints);
        // ... showPointInActiveCounty
        // Gunakan turf.pointsWithinPolygon untuk mendapatkan poin di dalam poligon
        const pointsInActiveCounty = turf.pointsWithinPolygon(
          turfPoints,
          activeCountyPolygon
        );
        onChangePoiInPolygon(pointsInActiveCounty);
      } else {
        console.error("Data county aktif tidak ditemukan");
      }
    } else {
      console.error("Data county aktif atau data POI tidak valid");
    }
  }, [
    filterPoiByType,
    demografiData,
    poiData,
    activeCounty,
    analizeActive,
    onChangePoiInPolygon,
    poiFilter,
  ]);

  const handleAnalyzeSelection = (filter, tipe) => {
    console.log(filter, tipe);
    setPoiFilter(filter);
    setTipeField(tipe);
  };

  useEffect(() => {
    if (analizeActive && activeCounty) {
      showPointInActiveCounty();
    }
  }, [analizeActive, showPointInActiveCounty, activeCounty]);

  return (
    <DropdownButton
      id="dropdown-analyze"
      title={
        <img
          src={
            analizeActive === "Fasilitas Pendidikan"
              ? pendidikanIcon
              : analizeActive === "Fasilitas Kesehatan"
              ? kesehatanIcon
              : analisisIcon
          }
          alt="layer-icon"
          style={{ height: "1.5em" }}
        />
      }
      variant="light"
      size="sm"
    >
      <Dropdown.Item
        active={analizeActive === null}
        onClick={() => {
          onChangeAnalyze(null);
        }}
      >
        Nonaktif
      </Dropdown.Item>
      <Dropdown.Item
        active={analizeActive === "Fasilitas Pendidikan"}
        onClick={() => {
          handleAnalyzeSelection(["FASILITAS PENDIDIKAN"], "TIPE_1");
          onChangeAnalyze("Fasilitas Pendidikan");
        }}
      >
        Fasilitas Pendidikan
      </Dropdown.Item>
      <Dropdown.Item
        active={analizeActive === "Fasilitas Kesehatan"}
        onClick={() => {
          handleAnalyzeSelection(["FASILITAS KESEHATAN"], "TIPE_1");
          onChangeAnalyze("Fasilitas Kesehatan");
        }}
      >
        Fasilitas Kesehatan
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default SpatialAnalyze;
