import React, { useState } from "react";
import { Line } from "react-chartjs-2";
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
import "./Dashboard.css"; // Optional: Custom styles

// Registering necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    carbonEmissions: "",
    waterUsage: "",
    wasteGenerated: "",
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Carbon Emissions",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Water Usage",
        data: [],
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Waste Generated",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
      },
      // Industry benchmarks (dummy data)
      {
        label: "Industry Carbon Emissions Benchmark",
        data: [10, 9, 8, 7, 6],
        borderColor: "rgba(75, 192, 192, 0.5)",
        borderDash: [5, 5],
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Industry Water Usage Benchmark",
        data: [12, 11, 10, 9, 8],
        borderColor: "rgba(54, 162, 235, 0.5)",
        borderDash: [5, 5],
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Industry Waste Generated Benchmark",
        data: [5, 6, 5, 6, 5],
        borderColor: "rgba(255, 99, 132, 0.5)",
        borderDash: [5, 5],
        borderWidth: 2,
        fill: false,
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMetrics((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const yearLabels = Array.from({ length: 5 }, (_, i) => 2023 - i); // Last 5 years

    const carbonData = [...chartData.datasets[0].data, metrics.carbonEmissions];
    const waterData = [...chartData.datasets[1].data, metrics.waterUsage];
    const wasteData = [...chartData.datasets[2].data, metrics.wasteGenerated];

    setChartData((prev) => ({
      labels: yearLabels,
      datasets: [
        { ...prev.datasets[0], data: carbonData },
        { ...prev.datasets[1], data: waterData },
        { ...prev.datasets[2], data: wasteData },
        // Industry benchmark datasets remain unchanged
        { ...prev.datasets[3] },
        { ...prev.datasets[4] },
        { ...prev.datasets[5] },
      ],
    }));

    // Reset input fields
    setMetrics({ carbonEmissions: "", waterUsage: "", wasteGenerated: "" });
  };

  const handleDownload = () => {
    const jsonData = {
      metrics: {
        carbonEmissions: chartData.datasets[0].data,
        waterUsage: chartData.datasets[1].data,
        wasteGenerated: chartData.datasets[2].data,
      },
      labels: chartData.labels,
      industryBenchmarks: {
        carbonEmissions: chartData.datasets[3].data,
        waterUsage: chartData.datasets[4].data,
        wasteGenerated: chartData.datasets[5].data,
      },
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "metrics-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    localStorage.clear("orenToken");
    window.location.reload(); // You can also redirect to login page
  };

  return (
    <div className="dashboard-container">
      <h1>Interactive Sustainability Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Carbon Emissions:</label>
          <input
            type="number"
            name="carbonEmissions"
            value={metrics.carbonEmissions}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        </div>
        <div className="form-group">
          <label>Water Usage:</label>
          <input
            type="number"
            name="waterUsage"
            value={metrics.waterUsage}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        </div>
        <div className="form-group">
          <label>Waste Generated:</label>
          <input
            type="number"
            name="wasteGenerated"
            value={metrics.wasteGenerated}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="primary-button bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Metrics
        </button>
      </form>

      <div className="chart-container my-8">
        <Line data={chartData} />
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        <button onClick={handleDownload} className="download-button">
          Download Data as JSON
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
