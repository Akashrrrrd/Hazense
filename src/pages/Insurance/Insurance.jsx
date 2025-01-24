import React, { useState, useEffect } from "react";
import "./Insurance.css";

const riskCategories = [
  { name: "High Risk", color: "#ff6b6b", icon: "⚠️" },
  { name: "Medium Risk", color: "#feca57", icon: "🟡" },
  { name: "Low Risk", color: "#48dbfb", icon: "✅" },
];

const InsuranceDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalPolicies: 5240,
    activeClaims: 342,
    pendingClaims: 87,
    totalRevenue: 1425600,
    riskDistribution: [
      { category: "High Risk", count: 45, percentage: 15 },
      { category: "Medium Risk", count: 135, percentage: 45 },
      { category: "Low Risk", count: 120, percentage: 40 },
    ],
  });

  const [activeTab, setActiveTab] = useState("overview");

  const renderRiskDistribution = () => (
    <div className="risk-distribution">
      <h3>Risk Distribution</h3>
      <div className="risk-bars">
        {dashboardData.riskDistribution.map((risk, index) => {
          const category = riskCategories.find((r) => r.name === risk.category);
          return (
            <div
              key={index}
              className="risk-bar"
              style={{
                width: `${risk.percentage}%`,
                backgroundColor: category.color,
              }}
            >
              {category.icon} {risk.category} ({risk.count})
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderMetricCard = (title, value, icon, subtext) => (
    <div className="metric-card">
      <div className="metric-icon">{icon}</div>
      <div className="metric-content">
        <h3>{title}</h3>
        <div className="metric-value">{value.toLocaleString()}</div>
        <p>{subtext}</p>
      </div>
    </div>
  );

  return (
    <div className="insurance-dashboard">
      <header className="dashboard-header">
        <h1>Insurance Management System</h1>
        <nav className="dashboard-tabs">
          <button
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={activeTab === "claims" ? "active" : ""}
            onClick={() => setActiveTab("claims")}
          >
            Claims
          </button>
          <button
            className={activeTab === "policies" ? "active" : ""}
            onClick={() => setActiveTab("policies")}
          >
            Policies
          </button>
        </nav>
      </header>

      <div className="dashboard-content">
        <div className="metrics-grid">
          {renderMetricCard(
            "Total Policies",
            dashboardData.totalPolicies,
            "📋",
            "Active insurance policies"
          )}
          {renderMetricCard(
            "Active Claims",
            dashboardData.activeClaims,
            "🚨",
            "Currently processed claims"
          )}
          {renderMetricCard(
            "Pending Claims",
            dashboardData.pendingClaims,
            "⏳",
            "Claims awaiting review"
          )}
          {renderMetricCard(
            "Total Revenue",
            dashboardData.totalRevenue,
            "💰",
            "Annual insurance revenue"
          )}
        </div>

        {renderRiskDistribution()}

        <div className="dashboard-actions">
          <button className="primary-action">Generate Report</button>
          <button className="secondary-action">New Claim</button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDashboard;
