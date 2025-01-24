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
  Shield,
  TrendingUp,
  TrendingDown,
  Car,
  MapPin,
  AlertOctagon,
} from "lucide-react";
import "./Dashboard.css";

const RiskAssessmentDashboard = () => {
  const [riskStats, setRiskStats] = useState({
    totalRiskScores: 512,
    highRiskDrivers: 64,
    lowRiskDrivers: 448,
    criticalRiskIncidents: 16,
  });

  const [riskTrendData] = useState([
    { month: "Jan", riskScore: 85 },
    { month: "Feb", riskScore: 79 },
    { month: "Mar", riskScore: 92 },
    { month: "Apr", riskScore: 68 },
    { month: "May", riskScore: 76 },
    { month: "Jun", riskScore: 88 },
  ]);

  // Simulate AI-driven risk assessment updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRiskStats((prev) => ({
        ...prev,
        highRiskDrivers: prev.highRiskDrivers + Math.floor(Math.random() * 2),
        totalRiskScores: prev.totalRiskScores + Math.floor(Math.random() * 3),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getRiskTrend = () => {
    const lastMonth = riskTrendData[riskTrendData.length - 1].riskScore;
    const previousMonth = riskTrendData[riskTrendData.length - 2].riskScore;
    return (((lastMonth - previousMonth) / previousMonth) * 100).toFixed(1);
  };

  return (
    <div className="risk-dashboard-container">
      <header className="risk-dashboard-header">
        <h1>AI Motor Insurance Risk Assessment</h1>
        <div className="last-updated">
          Last analyzed: {new Date().toLocaleTimeString()}
        </div>
      </header>

      <div className="risk-dashboard-stats">
        <div className="risk-stat-card">
          <Shield className="risk-stat-icon" />
          <h3>Total Risk Scores</h3>
          <div className="risk-stat-value">{riskStats.totalRiskScores}</div>
          <div className="risk-stat-change positive">
            <TrendingUp size={16} />
            <span>8.3% from last assessment</span>
          </div>
        </div>

        <div className="risk-stat-card critical">
          <AlertOctagon className="risk-stat-icon" />
          <h3>High-Risk Drivers</h3>
          <div className="risk-stat-value">{riskStats.highRiskDrivers}</div>
          <div className="risk-stat-change negative">
            <TrendingDown size={16} />
            <span>2.5% from previous period</span>
          </div>
        </div>

        <div className="risk-stat-card success">
          <Car className="risk-stat-icon" />
          <h3>Low-Risk Drivers</h3>
          <div className="risk-stat-value">{riskStats.lowRiskDrivers}</div>
          <div className="risk-stat-change positive">
            <TrendingUp size={16} />
            <span>{getRiskTrend()}% improvement</span>
          </div>
        </div>
      </div>

      <div className="risk-dashboard-charts">
        <div className="risk-chart-card">
          <h3>Risk Score Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="riskScore" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="risk-chart-card">
          <h3>Risk Hotspots</h3>
          <div className="map-placeholder">
            <MapPin size={48} />
            <p>AI Risk Mapping Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentDashboard;
