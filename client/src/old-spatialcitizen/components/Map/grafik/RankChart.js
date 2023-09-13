import React, { useEffect, useState } from "react";
import "./Chart.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const optionsRankChart = {
    scales: {
        x: {
            display: false
        }, 
        y: {
            beginAtZero: true
        }
    },
    responsive: true,
};

const RankChart = ({ demografiData, selectedItem, activeCounty }) => {
  const [rankData, setRankData] = useState({
    labels: [],
    datasets: [
      {
        label: "Jumlah Penduduk",
        data: [],
        backgroundColor: ["teal"],
      },
    ],
  });

  const sortDataByProperty = (data, property) => {
    return data
      .slice()
      .sort((a, b) => b.properties[property] - a.properties[property]);
  };

  useEffect(() => {
    if (demografiData) {
      const sortedData = sortDataByProperty(
        demografiData.features,
        selectedItem
      );
      const rankedData = {
        labels: sortedData.map(
          (feature) => feature.properties["DESA ATAU KELURAHAN"]
        ),
        datasets: [
          {
            label: selectedItem,
            data: sortedData.map((feature) => feature.properties[selectedItem]),
            backgroundColor: ["teal"],
          },
        ],
      };
      setRankData(rankedData);
    }
  }, [activeCounty, demografiData, selectedItem]);

  const onClickEvent = (event) => console.log(event);

  return (
    <div className="rank-chart-body">
      <Bar data={rankData} options={optionsRankChart} onClick={onClickEvent} />
    </div>
  );
};

export default RankChart;
