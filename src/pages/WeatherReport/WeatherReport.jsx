import React, { useState, useEffect } from "react";
import "./WeatherReport.css";

const WeatherReport = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [hazardAlerts, setHazardAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Constants for hazard thresholds
  const DANGEROUS_WIND_SPEED = 20; // m/s
  const DANGEROUS_TEMP_HIGH = 35; // °C
  const DANGEROUS_TEMP_LOW = 0; // °C
  const DANGEROUS_HUMIDITY = 85; // %
  const DANGEROUS_UV_INDEX = 8;
  const DANGEROUS_AIR_QUALITY = 150;
  const DANGEROUS_PRESSURE_LOW = 980; // hPa
  const DANGEROUS_PRESSURE_HIGH = 1040; // hPa

  // Enhanced manual weather data
  const manualData = {
    name: "London",
    sys: {
      country: "UK",
      sunrise: 1673676000, // Unix timestamp
      sunset: 1673710800, // Unix timestamp
    },
    main: {
      temp: 32,
      feels_like: 34,
      humidity: 88,
      pressure: 975,
    },
    wind: {
      speed: 22,
      deg: 180,
      gust: 28,
    },
    weather: [
      {
        main: "Thunderstorm",
        description: "thunderstorm with heavy rain",
        icon: "11d",
      },
    ],
    visibility: 8000,
    rain: {
      "1h": 5.2,
      "3h": 12.8,
    },
    air_quality: {
      aqi: 160,
      pm25: 75,
      pm10: 120,
      o3: 100,
      no2: 45,
    },
    uv_index: 9,
    precipitation_chance: 85,
    forecast: {
      hourly: [
        { time: "Now", temp: 32, icon: "11d" },
        { time: "+1h", temp: 31, icon: "10d" },
        { time: "+2h", temp: 30, icon: "10d" },
        { time: "+3h", temp: 29, icon: "04d" },
      ],
    },
  };

  const checkHazards = (data) => {
    const newHazards = [];

    if (data.wind.speed >= DANGEROUS_WIND_SPEED) {
      newHazards.push({
        type: "wind",
        severity: "high",
        message: `High wind speeds detected: ${data.wind.speed} m/s`,
      });
    }

    if (data.main.temp >= DANGEROUS_TEMP_HIGH) {
      newHazards.push({
        type: "temperature",
        severity: "high",
        message: `Extreme high temperature: ${Math.round(data.main.temp)}°C`,
      });
    }

    if (data.main.temp <= DANGEROUS_TEMP_LOW) {
      newHazards.push({
        type: "temperature",
        severity: "low",
        message: `Extreme low temperature: ${Math.round(data.main.temp)}°C`,
      });
    }

    if (data.main.humidity >= DANGEROUS_HUMIDITY) {
      newHazards.push({
        type: "humidity",
        severity: "high",
        message: `High humidity levels: ${data.main.humidity}%`,
      });
    }

    if (data.uv_index >= DANGEROUS_UV_INDEX) {
      newHazards.push({
        type: "uv",
        severity: "high",
        message: `High UV index: ${data.uv_index}`,
      });
    }

    if (data.air_quality.aqi >= DANGEROUS_AIR_QUALITY) {
      newHazards.push({
        type: "air_quality",
        severity: "high",
        message: `Poor air quality: AQI ${data.air_quality.aqi}`,
      });
    }

    if (data.main.pressure <= DANGEROUS_PRESSURE_LOW) {
      newHazards.push({
        type: "pressure",
        severity: "low",
        message: `Low pressure system: ${data.main.pressure} hPa`,
      });
    }

    if (data.main.pressure >= DANGEROUS_PRESSURE_HIGH) {
      newHazards.push({
        type: "pressure",
        severity: "high",
        message: `High pressure system: ${data.main.pressure} hPa`,
      });
    }

    // Check for severe weather conditions
    const severeConditions = ["thunderstorm", "tornado", "hurricane", "snow"];
    if (
      data.weather[0].description
        .toLowerCase()
        .includes(
          severeConditions.find((condition) =>
            data.weather[0].description.toLowerCase().includes(condition)
          )
        )
    ) {
      newHazards.push({
        type: "severe",
        severity: "extreme",
        message: `Severe weather condition: ${data.weather[0].description}`,
      });
    }

    setHazardAlerts(newHazards);
  };

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setWeatherData(manualData);
      checkHazards(manualData);
      setLastUpdate(new Date().toLocaleTimeString());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000);
    return () => clearInterval(interval);
  }, []);

  const getHazardSeverityClass = (severity) => {
    switch (severity) {
      case "high":
        return "hazard-high";
      case "extreme":
        return "hazard-extreme";
      default:
        return "hazard-moderate";
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAirQualityStatus = (aqi) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    return "Very Unhealthy";
  };

  const getUVIndexStatus = (uvIndex) => {
    if (uvIndex <= 2) return "Low";
    if (uvIndex <= 5) return "Moderate";
    if (uvIndex <= 7) return "High";
    if (uvIndex <= 10) return "Very High";
    return "Extreme";
  };

  if (loading) {
    return (
      <div className="weather-container loading">
        <div className="loading-spinner"></div>
        <p>Loading hazard detection system...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-container">
        <div className="error-alert">
          <span className="error-icon">⚠️</span>
          <h3>System Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-container">
      <div className="weather-header">
        <h1>Real-Time Hazard Detection System</h1>
        <div className="location-info">
          <span className="location-icon">📍</span>
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
        </div>
        <p className="last-update">Last updated: {lastUpdate}</p>
      </div>

      {hazardAlerts.length > 0 && (
        <div className="hazard-alerts">
          {hazardAlerts.map((alert, index) => (
            <div
              key={index}
              className={`hazard-alert ${getHazardSeverityClass(
                alert.severity
              )}`}
            >
              <span className="hazard-icon">⚠️</span>
              <p className="hazard-message">{alert.message}</p>
            </div>
          ))}
        </div>
      )}

      <div className="weather-grid">
        <div className="weather-card main-temp">
          <span className="card-icon">🌡️</span>
          <h3>Temperature</h3>
          <p className="reading">{Math.round(weatherData.main.temp)}°C</p>
          <p className="description">
            Feels like: {Math.round(weatherData.main.feels_like)}°C
          </p>
        </div>

        <div className="weather-card">
          <span className="card-icon">💨</span>
          <h3>Wind Status</h3>
          <p className="reading">{weatherData.wind.speed} m/s</p>
          <p className="description">
            Direction: {weatherData.wind.deg}°
            {weatherData.wind.gust && ` | Gusts: ${weatherData.wind.gust} m/s`}
          </p>
        </div>

        <div className="weather-card">
          <span className="card-icon">💧</span>
          <h3>Humidity</h3>
          <p className="reading">{weatherData.main.humidity}%</p>
          <p className="description">
            {weatherData.main.humidity > 70
              ? "High Moisture Level"
              : "Normal Moisture Level"}
          </p>
        </div>

        <div className="weather-card">
          <span className="card-icon">🌅</span>
          <h3>Sun Schedule</h3>
          <p className="reading">
            ↑ {formatTime(weatherData.sys.sunrise)}
            <br />↓ {formatTime(weatherData.sys.sunset)}
          </p>
        </div>

        <div className="weather-card">
          <span className="card-icon">👁️</span>
          <h3>Visibility</h3>
          <p className="reading">{weatherData.visibility / 1000} km</p>
          <p className="description">
            {weatherData.visibility >= 10000
              ? "Clear Visibility"
              : "Reduced Visibility"}
          </p>
        </div>

        <div className="weather-card">
          <span className="card-icon">☔</span>
          <h3>Precipitation</h3>
          <p className="reading">{weatherData.precipitation_chance}%</p>
          <p className="description">
            {weatherData.rain && `Last hour: ${weatherData.rain["1h"]}mm`}
          </p>
        </div>

        <div className="weather-card">
          <span className="card-icon">📊</span>
          <h3>Air Quality</h3>
          <p className="reading">AQI: {weatherData.air_quality.aqi}</p>
          <p className="description">
            {getAirQualityStatus(weatherData.air_quality.aqi)}
          </p>
        </div>

        <div className="weather-card">
          <span className="card-icon">☀️</span>
          <h3>UV Index</h3>
          <p className="reading">{weatherData.uv_index}</p>
          <p className="description">
            {getUVIndexStatus(weatherData.uv_index)}
          </p>
        </div>

        <div className="weather-card">
          <span className="card-icon">📉</span>
          <h3>Pressure</h3>
          <p className="reading">{weatherData.main.pressure} hPa</p>
          <p className="description">
            {weatherData.main.pressure < 1000
              ? "Low Pressure System"
              : "High Pressure System"}
          </p>
        </div>

        <div className="weather-card conditions">
          <span className="card-icon">🌤️</span>
          <h3>Current Conditions</h3>
          <p className="reading">{weatherData.weather[0].main}</p>
          <p className="description">{weatherData.weather[0].description}</p>
        </div>
      </div>

      <div className="hourly-forecast">
        <h3>Hourly Forecast</h3>
        <div className="forecast-grid">
          {weatherData.forecast.hourly.map((hour, index) => (
            <div key={index} className="forecast-card">
              <p className="forecast-time">{hour.time}</p>
              <p className="forecast-temp">{hour.temp}°C</p>
              <span className="forecast-icon">
                {hour.icon.includes("01")
                  ? "☀️"
                  : hour.icon.includes("02") || hour.icon.includes("03")
                  ? "⛅"
                  : hour.icon.includes("04")
                  ? "☁️"
                  : hour.icon.includes("09") || hour.icon.includes("10")
                  ? "🌧️"
                  : hour.icon.includes("11")
                  ? "⛈️"
                  : hour.icon.includes("13")
                  ? "❄️"
                  : "🌫️"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="air-quality-details">
        <h3>Detailed Air Quality</h3>
        <div className="air-quality-grid">
          <div className="air-quality-item">
            <span>PM2.5</span>
            <p>{weatherData.air_quality.pm25} µg/m³</p>
          </div>
          <div className="air-quality-item">
            <span>PM10</span>
            <p>{weatherData.air_quality.pm10} µg/m³</p>
          </div>
          <div className="air-quality-item">
            <span>O₃</span>
            <p>{weatherData.air_quality.o3} µg/m³</p>
          </div>
          <div className="air-quality-item">
            <span>NO₂</span>
            <p>{weatherData.air_quality.no2} µg/m³</p>
          </div>
        </div>
      </div>

      <button className="refresh-button" onClick={fetchWeatherData}>
        <span className="refresh-icon">🔄</span>
        Refresh Data
      </button>
    </div>
  );
};

export default WeatherReport;
