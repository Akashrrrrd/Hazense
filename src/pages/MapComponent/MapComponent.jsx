import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Loader } from "lucide-react";

// Fix for default marker icons in React-Leaflet
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ hazardData, isLoading }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "#ff4d4f";
      case "medium":
        return "#faad14";
      case "low":
        return "#52c41a";
      default:
        return "#666";
    }
  };

  if (isLoading) {
    return (
      <div className="map-loading">
        <Loader className="loading-icon spin" />
        <p>Loading map data...</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hazardData.map((hazard) => (
        <CircleMarker
          key={hazard.id}
          center={hazard.position}
          radius={10}
          pathOptions={{
            color: getSeverityColor(hazard.severity),
            fillColor: getSeverityColor(hazard.severity),
            fillOpacity: 0.7,
          }}
        >
          <Popup>
            <div className="hazard-popup">
              <h4 className={`severity-${hazard.severity}`}>
                {hazard.severity.toUpperCase()} RISK
              </h4>
              <p>{hazard.description}</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;