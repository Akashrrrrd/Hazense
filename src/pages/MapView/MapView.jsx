import React, { useState, useEffect } from "react";
import { Loader, MapPin } from "lucide-react";
import "./MapView.css";

const MapView = () => {
  const [userLocation, setUserLocation] = useState({
    lat: 51.505,
    lng: -0.09,
    accuracy: null,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (!navigator.geolocation) {
          throw new Error("Geolocation is not supported by your browser");
        }

        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          });
        });

        const { latitude, longitude, accuracy } = position.coords;
        setUserLocation({
          lat: latitude,
          lng: longitude,
          accuracy: Math.round(accuracy),
        });
      } catch (err) {
        setError(err.message);
        console.error("Location error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getLocation();
  }, []);

  // Using Google Maps embed URL that doesn't require API key
  const mapUrl = `https://maps.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=14&output=embed`;

  return (
    <div className="map-view">
      <header className="map-view__header">
        <h1 className="map-view__title">
          <MapPin className="map-view__icon" />
          Interactive Map View
        </h1>
        <p className="map-view__description">
          Explore your current location and surroundings in real-time
        </p>
      </header>

      <div className="map-view__content">
        {isLoading && (
          <div className="map-view__loading">
            <Loader className="map-view__spinner" />
            <p>Acquiring your location...</p>
          </div>
        )}

        {error && (
          <div className="map-view__custom-alert">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="map-view__alert-icon"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="map-view__alert-message">{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="map-view__info">
              <p>
                Latitude: {userLocation.lat.toFixed(6)}° | Longitude:{" "}
                {userLocation.lng.toFixed(6)}°
                {userLocation.accuracy &&
                  ` | Accuracy: ±${userLocation.accuracy}m`}
              </p>
            </div>
            <div className="map-view__container">
              <iframe
                title="Location Map"
                src={mapUrl}
                className={`map-view__iframe ${
                  mapLoaded ? "map-view__iframe--loaded" : ""
                }`}
                onLoad={() => setMapLoaded(true)}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {!mapLoaded && (
                <div className="map-view__map-loading">
                  <Loader className="map-view__spinner" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MapView;
