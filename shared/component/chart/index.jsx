"use client";
import React, { useState, useEffect } from "react";
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
import { $api } from "@/shared/lib/api"; // Импортируйте ваш API клиент

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Массив цветов для кандидатов
const colors = [
  "rgba(75,192,192,0.2)",
  "rgba(255,99,132,0.2)",
  "rgba(54,162,235,0.2)",
  "rgba(255,206,86,0.2)",
  "rgba(153,102,255,0.2)",
  "rgba(255,159,64,0.2)",
  "rgba(199,199,199,0.2)",
];

const borderColor = [
  "rgba(75,192,192,1)",
  "rgba(255,99,132,1)",
  "rgba(54,162,235,1)",
  "rgba(255,206,86,1)",
  "rgba(153,102,255,1)",
  "rgba(255,159,64,1)",
  "rgba(199,199,199,1)",
];

const MyChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    $api
      .get("votes/")
      .then((response) => {
        const serverData = response.data;

        // Форматируем данные для графика
        const formattedData = {
          labels: serverData.labels,
          datasets: serverData.datasets.map((dataset, index) => ({
            label: dataset.label,
            data: dataset.data,
            backgroundColor: colors[index % colors.length],
            borderColor: borderColor[index % borderColor.length],
            borderWidth: 1,
          })),
        };

        setChartData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!chartData) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      <h2>Отображение избирателей</h2>
      <Line data={chartData} />
    </div>
  );
};

export default MyChart;
