import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Map,
  AlertTriangle,
  CheckCircle,
  Activity,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalIncidents: 128,
    activeHazards: 32,
    resolvedHazards: 96,
    criticalHazards: 8,
  });

  const [trendData] = useState([
    { name: "Jan", hazards: 65 },
    { name: "Feb", hazards: 59 },
    { name: "Mar", hazards: 80 },
    { name: "Apr", hazards: 55 },
    { name: "May", hazards: 48 },
    { name: "Jun", hazards: 72 },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        activeHazards: prev.activeHazards + Math.floor(Math.random() * 3) - 1,
        totalIncidents: prev.totalIncidents + Math.floor(Math.random() * 2),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getPercentageChange = () => {
    const lastMonth = trendData[trendData.length - 1].hazards;
    const previousMonth = trendData[trendData.length - 2].hazards;
    return (((lastMonth - previousMonth) / previousMonth) * 100).toFixed(1);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Real Time Hazard Detection System</h1>
        <div className="last-updated">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <AlertTriangle className="stat-icon" />
          <h3>Total Incidents</h3>
          <div className="stat-value">{stats.totalIncidents}</div>
          <div className="stat-change positive">
            <ArrowUp size={16} />
            <span>12.5% from last month</span>
          </div>
        </div>

        <div className="stat-card critical">
          <Activity className="stat-icon" />
          <h3>Active Hazards</h3>
          <div className="stat-value">{stats.activeHazards}</div>
          <div className="stat-change negative">
            <ArrowDown size={16} />
            <span>3.2% from last week</span>
          </div>
        </div>

        <div className="stat-card success">
          <CheckCircle className="stat-icon" />
          <h3>Resolved Hazards</h3>
          <div className="stat-value">{stats.resolvedHazards}</div>
          <div className="stat-change positive">
            <ArrowUp size={16} />
            <span>{getPercentageChange()}% increase</span>
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-card">
          <h3>Hazard Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hazards" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Incident Locations</h3>
          <div className="map-placeholder">
            <Map size={48} />
            <p>Interactive map loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
