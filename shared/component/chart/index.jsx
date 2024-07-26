"use client";
// pages/index.js
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Регистрация компонентов
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "сколько я дрочил",
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: "сколько Самаган дрочил",
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      data: [69, 39, 80, 55, 11, 34, 77],
    },
  ],

};

const MyChart = () => (
  <div>
    <h2>Отображение изберателей</h2>
    <Line data={data} />
  </div>
);

export default MyChart;
