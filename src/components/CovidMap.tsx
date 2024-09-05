import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import { fetchCountryData } from "../api/api";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import { CountryData } from "../types/type";

// Define a custom icon
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // Default marker icon
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
});

const CovidMap: React.FC = () => {
  const { data, isLoading, error } = useQuery<CountryData[]>({
    queryKey: ["countryData"],
    queryFn: fetchCountryData,
  });

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-4 text-red-500">
        Error loading map data
      </div>
    );

  const defaultCenter: LatLngExpression = [20, 0]; // Default center position

  return (
    <div className="p-4 bg-white rounded-lg shadow-md relative z-10">
      <MapContainer
        center={defaultCenter}
        zoom={2}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {data?.map((country) => (
          <Marker
            key={country.countryInfo._id}
            position={[country.countryInfo.lat, country.countryInfo.long]}
            icon={customIcon}
          >
            <Popup>
              <div>
                <img
                  src={country.countryInfo.flag}
                  alt={`${country.country} flag`}
                  className="w-16 h-10 mb-2"
                />
                <h3 className="font-bold text-lg mb-2">{country.country}</h3>
                <p>
                  <strong>Active Cases:</strong> {country.active}
                </p>
                <p>
                  <strong>Recovered:</strong> {country.recovered}
                </p>
                <p>
                  <strong>Deaths:</strong> {country.deaths}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CovidMap;
