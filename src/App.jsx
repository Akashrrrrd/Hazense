import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Incidents from "./pages/Incidents/Incidents";
import MapView from "./pages/MapView/MapView";
import Analytics from "./pages/Analytics/Analytics";
import Monitoring from "./pages/Monitoring/Monitoring";
import Dashboard from "./pages/Dashboard/Dashboard";
import WeatherReport from "./pages/WeatherReport/WeatherReport";
import Settings from "./pages/Settings/Settings";

// We need this to handle potential leaflet issues in React 18 Strict Mode
import { useEffect } from "react";
import L from "leaflet";
import Notifications from "./components/Notification/Notification";
import InsuranceDashboard from "./pages/Insurance/Insurance";

// Initialize leaflet icons once at app level
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "node_modules/leaflet/dist/images/marker-icon.png",
  iconRetinaUrl: "node_modules/leaflet/dist/images/marker-icon-2x.png",
  shadowUrl: "node_modules/leaflet/dist/images/marker-shadow.png",
});

const App = () => {
  // Fix for leaflet icons in development mode
  useEffect(() => {
    const L = window.L;
    if (L) {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "node_modules/leaflet/dist/images/marker-icon.png",
        iconRetinaUrl: "node_modules/leaflet/dist/images/marker-icon-2x.png",
        shadowUrl: "node_modules/leaflet/dist/images/marker-shadow.png",
      });
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/weather" element={<WeatherReport />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications/>}/>
            <Route path="/insurance" element={<InsuranceDashboard/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
