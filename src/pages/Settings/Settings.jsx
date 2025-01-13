import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    theme: "system",
    notifications: false,
  });

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleCancel = () => {
    // Reset form or navigate back
    setFormData({
      username: "",
      email: "",
      password: "",
      theme: "system",
      notifications: false,
    });
  };

  return (
    <form className="settings" onSubmit={handleSubmit}>
      <header className="settings__header">
        <h1>Settings</h1>
      </header>

      <section className="settings__section">
        <h2>Account Settings</h2>
        <div className="settings__group">
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter a new password"
            />
          </div>
        </div>
      </section>

      <section className="settings__section">
        <h2>Preferences</h2>
        <div className="settings__group">
          <div className="form-control">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              value={formData.theme}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>

          <div className="form-control form-control--checkbox">
            <label htmlFor="notifications">
              <input
                type="checkbox"
                id="notifications"
                checked={formData.notifications}
                onChange={handleInputChange}
              />
              <span>Enable Notifications</span>
            </label>
          </div>
        </div>
      </section>

      <footer className="settings__footer">
        <button
          type="button"
          className="btn btn--secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn--primary">
          Save Changes
        </button>
      </footer>
    </form>
  );
};

export default Settings;
