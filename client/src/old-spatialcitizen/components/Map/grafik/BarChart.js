import React, { useRef } from "react";
import "./Chart.css";
import { Bar, Pie, getElementAtEvent } from "react-chartjs-2";
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

export const optionsHorizontalBar = {
  indexAxis: "y",
  layout: {
    padding: 20,
  },
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
  },
};

export const optionsVerticalBar = {
  responsive: true,
  plugins: {
    tooltip: {
      enabled: false,
    },
  },
};

export const optionsPie = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const HorizontalBarChart = ({ horizontalData }) => {
  const chartRef = useRef();
  const onClick = (event) => {
    console.log(getElementAtEvent(chartRef.current, event));
  };

  return (
    <div className="grafik-chart-body">
      <Bar
        ref={chartRef}
        data={horizontalData}
        options={optionsHorizontalBar}
        onClick={onClick}
      />
    </div>
  );
};

const VerticalBarChart = ({ verticalData }) => {
  return (
    <div className="grafik-chart-body">
      <Bar data={verticalData} options={optionsVerticalBar} />
    </div>
  );
};

const PieChart = ({ pieData }) => {
  return (
    <div className="grafik-chart-body">
      <Pie data={pieData} options={optionsPie} />
    </div>
  );
};
export { HorizontalBarChart, VerticalBarChart, PieChart };
