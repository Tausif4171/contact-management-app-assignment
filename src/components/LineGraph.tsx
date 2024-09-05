import React from "react";
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { fetchGraphData } from "../api/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

type HistoricalData = {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
};

const LineGraph: React.FC = () => {
  const { data, isLoading, error } = useQuery<HistoricalData>({
    queryKey: ["graphData"],
    queryFn: fetchGraphData,
  });

  if (isLoading)
    return <div className="text-center py-4 text-gray-600">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-4 text-red-500">
        Error loading graph data
      </div>
    );
  if (!data)
    return (
      <div className="text-center py-4 text-gray-600">No data available</div>
    );

  const chartData = {
    labels: Object.keys(data.cases),
    datasets: [
      {
        label: "Cases",
        data: Object.values(data.cases),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="relative h-80">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
                labels: {
                  font: {
                    size: 14,
                    family: "Arial, sans-serif",
                  },
                  color: "#333",
                },
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `Cases: ${tooltipItem.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  font: {
                    size: 12,
                    family: "Arial, sans-serif",
                  },
                },
              },
              y: {
                grid: {
                  color: function (context) {
                    return context.tick.value % 2 === 0
                      ? "rgba(0,0,0,0.1)"
                      : "transparent";
                  },
                },
                ticks: {
                  font: {
                    size: 12,
                    family: "Arial, sans-serif",
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LineGraph;
