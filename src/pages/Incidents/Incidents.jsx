import React, { useEffect, useState } from "react";
import { AlertCircle, Clock, MapPin, RefreshCw } from "lucide-react";
import "./Incidents.css";

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const getStatusColor = (status) => {
    const statusColors = {
      "In Progress": "status-in-progress",
      Resolved: "status-resolved",
      Reported: "status-reported",
      Critical: "status-critical",
    };
    return statusColors[status] || "status-default";
  };

  const formatTimeAgo = (timestamp) => {
    const minutes = Math.floor((new Date() - new Date(timestamp)) / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const fetchIncidents = () => {
    setLoading(true);
    try {
      // Simulated API call with expanded incident data
      const data = [
        {
          id: 1,
          title: "Power Outage",
          description:
            "Multiple blocks affected by power outage. Emergency response teams dispatched.",
          status: "In Progress",
          timestamp: "2025-01-12T10:30:00",
          location: "Downtown",
          severity: "High",
          affectedArea: "5 city blocks",
          estimatedResolution: "2 hours",
        },
        {
          id: 2,
          title: "Road Blockage",
          description:
            "Major traffic disruption due to multi-vehicle accident. Police and emergency services on scene.",
          status: "Resolved",
          timestamp: "2025-01-11T08:15:00",
          location: "Main Street & 5th Avenue",
          severity: "Medium",
          affectedArea: "Intersection",
          estimatedResolution: "Cleared",
        },
        {
          id: 3,
          title: "Water Supply Issue",
          description:
            "Emergency maintenance required for main water supply line. Temporary service interruption expected.",
          status: "Critical",
          timestamp: "2025-01-12T09:00:00",
          location: "Elmwood District",
          severity: "High",
          affectedArea: "Entire neighborhood",
          estimatedResolution: "4 hours",
        },
        {
          id: 4,
          title: "Fire Alert",
          description:
            "Residential building fire reported. Firefighters and emergency personnel on site.",
          status: "In Progress",
          timestamp: "2025-01-12T11:00:00",
          location: "Hillside Apartments",
          severity: "Critical",
          affectedArea: "Building and adjacent structures",
          estimatedResolution: "Under evaluation",
        },
        {
          id: 5,
          title: "Gas Leak",
          description:
            "Gas leak detected in industrial area. Evacuation and containment measures underway.",
          status: "Reported",
          timestamp: "2025-01-12T08:45:00",
          location: "Industrial Park Zone A",
          severity: "High",
          affectedArea: "3 warehouses",
          estimatedResolution: "6 hours",
        },
        {
          id: 6,
          title: "Severe Weather Warning",
          description:
            "Heavy rain and strong winds expected. Flooding risk in low-lying areas.",
          status: "Active",
          timestamp: "2025-01-12T07:30:00",
          location: "Coastal Region",
          severity: "High",
          affectedArea: "Entire coastal area",
          estimatedResolution: "Monitor updates",
        },
      ];

      setIncidents(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchIncidents();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchIncidents, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="incidents-container">
      <header className="incidents-header">
        <h1>Real-Time Incident Reports</h1>
        <div className="refresh-section">
          <button
            onClick={fetchIncidents}
            className="refresh-button-in"
            disabled={loading}
          >
            <RefreshCw className={loading ? "spin" : ""} size={20} />
            Refresh
          </button>
          <span className="last-updated">
            Last updated: {formatTimeAgo(lastUpdated)}
          </span>
        </div>
      </header>

      {loading ? (
        <div className="loading">
          <RefreshCw className="spin" size={24} />
          <span>Loading incidents...</span>
        </div>
      ) : incidents.length > 0 ? (
        <ul className="incident-list">
          {incidents.map((incident) => (
            <li key={incident.id} className="incident-item">
              <div className="incident-header">
                <div className="incident-title-group">
                  <AlertCircle size={20} />
                  <h2>{incident.title}</h2>
                </div>
                <span
                  className={`incident-status ${getStatusColor(
                    incident.status
                  )}`}
                >
                  {incident.status}
                </span>
              </div>

              <p className="incident-description">{incident.description}</p>

              <div className="incident-metadata">
                <div className="metadata-item">
                  <Clock size={16} />
                  <span>Reported: {formatTimeAgo(incident.timestamp)}</span>
                </div>
                <div className="metadata-item">
                  <MapPin size={16} />
                  <span>{incident.location}</span>
                </div>
              </div>

              <div className="incident-details">
                <div className="detail-item">
                  <span className="detail-label">Severity:</span>
                  <span className="detail-value">{incident.severity}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Affected Area:</span>
                  <span className="detail-value">{incident.affectedArea}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Est. Resolution:</span>
                  <span className="detail-value">
                    {incident.estimatedResolution}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-incidents">
          <AlertCircle size={24} />
          <p>No incidents reported at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Incidents;
