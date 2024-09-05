import React from "react";
import LineGraph from "../components/LineGraph";
import CovidMap from "../components/CovidMap";

const ChartMapViewer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Worldwide Cases Fluctuation
        </h2>
        <LineGraph />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Covid-19 Map</h2>
        <CovidMap />
      </div>
    </div>
  );
};

export default ChartMapViewer;
