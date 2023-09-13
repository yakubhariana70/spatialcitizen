import React, { useCallback, useEffect, useRef, useState } from "react";
import * as turf from "@turf/turf";

const PointWithinPolygons = ({
  demografiData,
  poiData,
  activeCounty,
  analizeActive,
  onChangePoiInPolygon,
  onChangeAnalize,
  poiFilterProps,
  tipeFieldProps,
  buttonText
}) => {
  // || ANALISIS SPASIAL
  useEffect(() => {
    console.log("Analisis Spasial:", analizeActive);
  }, [analizeActive]);

  const [poiFilter, setPoiFilter] = useState(null);
  const [tipeField, setTipeField] = useState(null);

  const filterPoiByType = useCallback((filterType, poiGeoJSON) => {
    return poiGeoJSON.features.filter((feature) => {
      // Sesuaikan properti atau field yang digunakan untuk filter
      return filterType.includes(feature.properties[tipeField]);
    });
  },[tipeField]);

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

        // Gunakan turf.pointsWithinPolygon untuk mendapatkan poin di dalam poligon
        const pointsInActiveCounty = turf.pointsWithinPolygon(
          turfPoints,
          activeCountyPolygon
        );
        console.log(
          "halo, POI dalam kelurahan",
          activeCounty,
          "yaitu",
          pointsInActiveCounty
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

  // Menggunakan useRef untuk menyimpan showPointInActiveCounty tanpa perubahan
  const showPointInActiveCountyRef = useRef(showPointInActiveCounty);

  useEffect(() => {
    // Assign showPointInActiveCountyRef ke showPointInActiveCounty
    showPointInActiveCountyRef.current = showPointInActiveCounty;
  }, [showPointInActiveCounty]);

  useEffect(() => {
    if (analizeActive && activeCounty) {
      showPointInActiveCountyRef.current();
    }
  }, [analizeActive, activeCounty]);

  const analizePoiFilter = (filter, tipe) => {
    console.log(filter, tipe);
    setPoiFilter(filter)
    setTipeField(tipe)

    onChangeAnalize()
  }

  return (
    <div className="analize-feature">
      <button
        onClick={() => analizePoiFilter(["FASILITAS PENDIDIKAN"],"TIPE_1")}
      >
        Fasilitas Pendidikan
      </button>
      <button
        onClick={() => analizePoiFilter(["FASILITAS KESEHATAN"],"TIPE_1")}
      >
        Fasilitas Kesehatan
      </button>
    </div>
  );
};

export default PointWithinPolygons;
