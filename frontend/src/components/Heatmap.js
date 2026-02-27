import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import './Heatmap.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const AQIMarker = ({ coordinates, currentAQI }) => {
  const map = useMap();
  
  useEffect(() => {
    if (coordinates) {
      map.setView([coordinates.lat, coordinates.lon], 10);
    }
  }, [coordinates, map]);

  if (!coordinates || !currentAQI) return null;

  // Create custom icon based on AQI level
  const getMarkerColor = (aqi) => {
    if (aqi <= 50) return '#009966';
    if (aqi <= 100) return '#FFDE33';
    if (aqi <= 150) return '#FF9933';
    if (aqi <= 200) return '#CC0033';
    if (aqi <= 300) return '#660099';
    return '#7E0023';
  };

  const customIcon = L.divIcon({
    className: 'custom-aqi-marker',
    html: `
      <div style="
        background: ${getMarkerColor(currentAQI.value)};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        ${currentAQI.value}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  return (
    <Marker position={[coordinates.lat, coordinates.lon]} icon={customIcon}>
      <Popup>
        <div className="aqi-popup">
          <h4>Current AQI</h4>
          <div className="popup-aqi-value" style={{ color: getMarkerColor(currentAQI.value) }}>
            {currentAQI.value}
          </div>
          <div className="popup-category">{currentAQI.category}</div>
        </div>
      </Popup>
    </Marker>
  );
};

const Heatmap = ({ coordinates, forecastData }) => {
  if (!coordinates) {
    return (
      <div className="heatmap-container">
        <div className="heatmap-loading">
          <p>Loading map data...</p>
        </div>
      </div>
    );
  }

  // Get current AQI from forecast data
  const currentAQI = forecastData && forecastData.length > 0 ? 
    { value: forecastData[0].aqi, category: forecastData[0].category } : 
    null;

  return (
    <div className="heatmap-container">
      <div className="heatmap-header">
        <h3>Air Quality Map</h3>
        <p>Interactive map showing current AQI levels</p>
      </div>
      
      <div className="map-wrapper">
        <MapContainer
          center={[coordinates.lat, coordinates.lon]}
          zoom={10}
          style={{ height: '400px', width: '100%' }}
          className="leaflet-map"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <AQIMarker coordinates={coordinates} currentAQI={currentAQI} />
        </MapContainer>
      </div>
      
      <div className="map-legend">
        <h4>AQI Color Scale</h4>
        <div className="legend-grid">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#009966' }}></div>
            <span>0-50 Good</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#FFDE33' }}></div>
            <span>51-100 Moderate</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#FF9933' }}></div>
            <span>101-150 Unhealthy for Sensitive</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#CC0033' }}></div>
            <span>151-200 Unhealthy</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#660099' }}></div>
            <span>201-300 Very Unhealthy</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#7E0023' }}></div>
            <span>301+ Hazardous</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;