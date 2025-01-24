import React, { useEffect, useState } from "react";
import { AlertCircle, Clock, MapPin, RefreshCw } from "lucide-react";
import "./Incidents.css";

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const getStatusColor = (status) => {
    const statusColors = {
      "High Risk": "status-critical",
      "Medium Risk": "status-in-progress",
      "Low Risk": "status-resolved",
      Resolved: "status-reported",
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
      // Simulated motor insurance risk assessment incidents
      const data = [
        {
          id: 1,
          title: "High-Risk Driver Profile",
          description:
            "Multiple traffic violations detected. Potential insurance premium adjustment required.",
          status: "High Risk",
          timestamp: "2025-01-12T10:30:00",
          location: "Urban Driving Zone",
          severity: "Critical",
          affectedArea: "Driver Risk Assessment",
          estimatedResolution: "Immediate Review",
        },
        {
          id: 2,
          title: "Accident Frequency Alert",
          description:
            "Driver involved in multiple minor accidents within 6 months. Risk profile escalation needed.",
          status: "Medium Risk",
          timestamp: "2025-01-11T08:15:00",
          location: "Suburban Area",
          severity: "High",
          affectedArea: "Claims History",
          estimatedResolution: "Risk Reassessment",
        },
        {
          id: 3,
          title: "Safe Driving Bonus",
          description:
            "Driver maintains excellent driving record. Qualifies for insurance premium reduction.",
          status: "Low Risk",
          timestamp: "2025-01-12T09:00:00",
          location: "Rural District",
          severity: "Low",
          affectedArea: "Driver Performance",
          estimatedResolution: "Bonus Approval",
        },
        {
          id: 4,
          title: "Telematics Data Anomaly",
          description:
            "Unusual driving patterns detected. Requires comprehensive risk analysis.",
          status: "Medium Risk",
          timestamp: "2025-01-12T11:00:00",
          location: "Metropolitan Region",
          severity: "Medium",
          affectedArea: "Driving Behavior",
          estimatedResolution: "Detailed Investigation",
        },
        {
          id: 5,
          title: "New Driver Risk Assessment",
          description:
            "Young driver with limited driving experience. Initial risk profile evaluation.",
          status: "High Risk",
          timestamp: "2025-01-12T08:45:00",
          location: "Citywide",
          severity: "High",
          affectedArea: "New Driver Segment",
          estimatedResolution: "Risk Profiling",
        },
        {
          id: 6,
          title: "Safe Driver Recognition",
          description:
            "Consistent safe driving behavior over extended period. Recommended for premium benefits.",
          status: "Low Risk",
          timestamp: "2025-01-12T07:30:00",
          location: "Nationwide",
          severity: "Low",
          affectedArea: "Driver Rewards",
          estimatedResolution: "Benefit Approval",
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
        <h1>Motor Insurance Risk Assessment</h1>
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
          <span>Loading risk assessments...</span>
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
                  <span>Assessed: {formatTimeAgo(incident.timestamp)}</span>
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
                  <span className="detail-label">Assessment Area:</span>
                  <span className="detail-value">{incident.affectedArea}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Next Step:</span>
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
          <p>No risk assessments at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Incidents;
