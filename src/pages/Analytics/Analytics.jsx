import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  PieChart as PieChartIcon,
} from "lucide-react";
import "./Analytics.css";

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    incidents: [],
    hazardTypes: [],
    stats: {},
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        const mockData = {
          incidents: [
            { month: "Jan", incidents: 30 },
            { month: "Feb", incidents: 40 },
            { month: "Mar", incidents: 35 },
            { month: "Apr", incidents: 50 },
            { month: "May", incidents: 45 },
            { month: "Jun", incidents: 60 },
          ],
          hazardTypes: [
            { name: "Chemical", value: 35 },
            { name: "Physical", value: 25 },
            { name: "Biological", value: 20 },
            { name: "Ergonomic", value: 15 },
            { name: "Psychological", value: 5 },
          ],
          stats: {
            totalIncidents: 120,
            activeHazards: 35,
            resolvedHazards: 85,
          },
        };

        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate loading
        setData(mockData);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load analytics data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading analytics data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <AlertTriangle />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <header className="analytics-header">
        <h1>Hazard Analytics Dashboard</h1>
        <span className="last-updated">
          Last updated: {new Date().toLocaleString()}
        </span>
      </header>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-header">
            <TrendingUp />
            <h3>Total Incidents</h3>
          </div>
          <p className="stat-value">{data.stats.totalIncidents}</p>
          <span className="stat-trend positive">+12%</span>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <AlertTriangle />
            <h3>Active Hazards</h3>
          </div>
          <p className="stat-value">{data.stats.activeHazards}</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <CheckCircle />
            <h3>Resolved Hazards</h3>
          </div>
          <p className="stat-value">{data.stats.resolvedHazards}</p>
          <span className="stat-trend positive">+8%</span>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <div className="chart-header">
            <TrendingUp />
            <h3>Incidents Over Time</h3>
          </div>
          <div className="chart-content">
            <ResponsiveContainer>
              <LineChart data={data.incidents}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="incidents"
                  stroke="#0088FE"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <PieChartIcon />
            <h3>Hazard Types Distribution</h3>
          </div>
          <div className="chart-content">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data.hazardTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {data.hazardTypes.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
