import React, { useState, useEffect } from "react";
import {
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  RefreshCw,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";
import "./Monitoring.css";

const Monitoring = () => {
  const [monitoringData, setMonitoringData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  // Simulated monitoring data
  const generateMonitoringData = () => [
    {
      id: 1,
      location: "Highway 101",
      status: "Active",
      lastUpdated: new Date(Date.now() - 5 * 60000),
      riskLevel: "Medium",
      sensors: 5,
      activeAlerts: 2,
    },
    {
      id: 2,
      location: "Downtown Ave",
      status: "Inactive",
      lastUpdated: new Date(Date.now() - 10 * 60000),
      riskLevel: "Low",
      sensors: 3,
      activeAlerts: 0,
    },
    {
      id: 3,
      location: "Bridge Way",
      status: "Active",
      lastUpdated: new Date(Date.now() - 2 * 60000),
      riskLevel: "High",
      sensors: 8,
      activeAlerts: 4,
    },
    {
      id: 4,
      location: "Industrial Park",
      status: "Maintenance",
      lastUpdated: new Date(Date.now() - 15 * 60000),
      riskLevel: "Medium",
      sensors: 6,
      activeAlerts: 1,
    },
    {
      id: 5,
      location: "Port Terminal",
      status: "Active",
      lastUpdated: new Date(Date.now() - 8 * 60000),
      riskLevel: "Critical",
      sensors: 10,
      activeAlerts: 7,
    },
    {
      id: 6,
      location: "Airport Zone",
      status: "Active",
      lastUpdated: new Date(Date.now() - 3 * 60000),
      riskLevel: "Low",
      sensors: 7,
      activeAlerts: 0,
    },
    {
      id: 7,
      location: "Suburban District",
      status: "Inactive",
      lastUpdated: new Date(Date.now() - 20 * 60000),
      riskLevel: "Low",
      sensors: 2,
      activeAlerts: 0,
    },
    {
      id: 8,
      location: "City Center",
      status: "Active",
      lastUpdated: new Date(Date.now() - 1 * 60000),
      riskLevel: "High",
      sensors: 9,
      activeAlerts: 5,
    },
    {
      id: 9,
      location: "Railway Station",
      status: "Maintenance",
      lastUpdated: new Date(Date.now() - 25 * 60000),
      riskLevel: "Medium",
      sensors: 4,
      activeAlerts: 1,
    },
    {
      id: 10,
      location: "University Campus",
      status: "Active",
      lastUpdated: new Date(Date.now() - 6 * 60000),
      riskLevel: "Medium",
      sensors: 6,
      activeAlerts: 3,
    },
    {
      id: 11,
      location: "Mall Plaza",
      status: "Inactive",
      lastUpdated: new Date(Date.now() - 12 * 60000),
      riskLevel: "Low",
      sensors: 3,
      activeAlerts: 0,
    },
    {
      id: 12,
      location: "Harbor Area",
      status: "Active",
      lastUpdated: new Date(Date.now() - 4 * 60000),
      riskLevel: "Critical",
      sensors: 12,
      activeAlerts: 8,
    },
  ];

  console.log(generateMonitoringData());

  // Fetch data and set up auto-refresh
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = generateMonitoringData();
        setMonitoringData(data);
        setLastRefreshed(new Date());
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch monitoring data");
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, refreshInterval * 1000);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  // Sort function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort data
  const getProcessedData = () => {
    let filtered = [...monitoringData];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.riskLevel.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (item) => item.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  };

  const formatLastUpdated = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / 60000);
    return diff < 60 ? `${diff} mins ago` : date.toLocaleString();
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return <CheckCircle className="status-icon status-active" />;
      case "inactive":
        return <AlertTriangle className="status-icon status-inactive" />;
      case "maintenance":
        return <RefreshCw className="status-icon status-maintenance" />;
      default:
        return null;
    }
  };

  const getRiskLevelClass = (level) => {
    switch (level.toLowerCase()) {
      case "low":
        return "risk-low";
      case "medium":
        return "risk-medium";
      case "high":
        return "risk-high";
      case "critical":
        return "risk-critical";
      default:
        return "";
    }
  };

  if (error) {
    return (
      <div className="error-container">
        <AlertTriangle className="error-icon" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="monitoring-container">
      <header className="monitoring-header">
        <div className="monitoring-title">
          <h2>Real-Time Monitoring</h2>
          <div className="refresh-info">
            <Clock className="clock-icon" />
            <span>Last updated: {formatLastUpdated(lastRefreshed)}</span>
          </div>
        </div>

        <div className="monitoring-controls">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search locations, status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-container">
            <Filter className="filter-icon" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-filter"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <ChevronDown className="select-icon" />
          </div>

          <div className="refresh-container">
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="refresh-select"
            >
              <option value={15}>Refresh: 15s</option>
              <option value={30}>Refresh: 30s</option>
              <option value={60}>Refresh: 1m</option>
            </select>
            <ChevronDown className="select-icon" />
          </div>
        </div>
      </header>

      <div className="monitoring-table-container">
        {loading ? (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Loading monitoring data...</p>
          </div>
        ) : (
          <table className="monitoring-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("id")}>
                  <span className="th-content">
                    ID
                    <ArrowUpDown className="sort-icon" />
                  </span>
                </th>
                <th onClick={() => handleSort("location")}>
                  <span className="th-content">
                    Location
                    <ArrowUpDown className="sort-icon" />
                  </span>
                </th>
                <th onClick={() => handleSort("status")}>
                  <span className="th-content">
                    Status
                    <ArrowUpDown className="sort-icon" />
                  </span>
                </th>
                <th onClick={() => handleSort("riskLevel")}>
                  <span className="th-content">
                    Risk Level
                    <ArrowUpDown className="sort-icon" />
                  </span>
                </th>
                <th onClick={() => handleSort("sensors")}>
                  <span className="th-content">
                    Sensors
                    <ArrowUpDown className="sort-icon" />
                  </span>
                </th>
                <th onClick={() => handleSort("activeAlerts")}>
                  <span className="th-content">
                    Active Alerts
                    <ArrowUpDown className="sort-icon" />
                  </span>
                </th>
                <th onClick={() => handleSort("lastUpdated")}>
                  <span className="th-content">
                    Last Updated
                    <ArrowUpDown className="sort-icon" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {getProcessedData().map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <div className="location-cell">
                      <MapPin className="location-icon" />
                      {item.location}
                    </div>
                  </td>
                  <td>
                    <div className="status-cell">
                      {getStatusIcon(item.status)}
                      <span>{item.status}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`risk-level ${getRiskLevelClass(
                        item.riskLevel
                      )}`}
                    >
                      {item.riskLevel}
                    </span>
                  </td>
                  <td>{item.sensors}</td>
                  <td>
                    <div
                      className={`alerts-cell ${
                        item.activeAlerts > 0 ? "has-alerts" : ""
                      }`}
                    >
                      {item.activeAlerts}
                    </div>
                  </td>
                  <td>{formatLastUpdated(item.lastUpdated)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Monitoring;
