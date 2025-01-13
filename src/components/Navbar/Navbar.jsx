import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  AlertTriangle,
  Activity,
  Bell,
  Map,
  BarChart2,
  Cloud,
} from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("dashboard");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [notificationCount, setNotificationCount] = useState(3);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const navLinks = [
    {
      name: "Home",
      to: "/",
      icon: HomeIcon,
      id: "dashboard",
    },
    {
      name: "Incidents",
      to: "/incidents",
      icon: AlertTriangle,
      id: "incidents",
    },
    {
      name: "Alerts",
      to: "/monitoring",
      icon: Activity,
      id: "monitoring",
    },
    {
      name: "Analytics",
      to: "/analytics",
      icon: BarChart2,
      id: "analytics",
    },
    {
      name: "Map",
      to: "/map",
      icon: Map,
      id: "map",
    },
    {
      name: "Weather",
      to: "/weather",
      icon: Cloud,
      id: "weather",
    },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/" className="navbar-link">
              <h1>
                Haz<span>ense</span>
              </h1>
              <p className="navbar-subtitle">Hazard Detection System</p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.to}
                  className={activeLink === link.id ? "active" : ""}
                  onClick={() => handleLinkClick(link.id)}
                >
                  <link.icon size={18} />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Notification Icon */}
          <div className="navbar-actions">
           <Link to="/notifications"> <button
              className="action-button notification-button"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className="notification-badge">{notificationCount}</span>
              )}
            </button></Link>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="mobile-bottom-nav">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              className={`mobile-nav-item ${
                activeLink === link.id ? "active" : ""
              }`}
              onClick={() => handleLinkClick(link.id)}
            >
              <link.icon size={20} />
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
