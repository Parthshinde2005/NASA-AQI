import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import './AQICard.css';

const AQICard = ({ city, currentAQI }) => {
  const getAQIIcon = (category) => {
    if (!category) return <AlertTriangle size={24} />;
    
    if (category === 'Good') return <CheckCircle size={24} />;
    if (category === 'Moderate') return <AlertTriangle size={24} />;
    return <XCircle size={24} />;
  };

  const getHealthMessage = (category) => {
    const messages = {
      'Good': 'Air quality is satisfactory. Enjoy outdoor activities!',
      'Moderate': 'Air quality is acceptable for most people.',
      'Unhealthy for Sensitive Groups': 'Sensitive individuals should limit outdoor activities.',
      'Unhealthy': 'Everyone should limit outdoor activities.',
      'Very Unhealthy': 'Avoid outdoor activities. Stay indoors.',
      'Hazardous': 'Emergency conditions. Everyone should stay indoors.'
    };
    return messages[category] || 'Air quality data unavailable.';
  };

  if (!currentAQI) {
    return (
      <div className="card aqi-card">
        <h2>Air Quality Index</h2>
        <div className="aqi-loading">
          <p>Loading AQI data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card aqi-card">
      <div className="aqi-header">
        <h2>Air Quality Index</h2>
        <div className="city-name">{city}</div>
      </div>
      
      <div 
        className="aqi-value-container"
        style={{ backgroundColor: currentAQI.color }}
      >
        <div className="aqi-icon">
          {getAQIIcon(currentAQI.category)}
        </div>
        <div className="aqi-value">{currentAQI.value}</div>
        <div className="aqi-category">{currentAQI.category}</div>
      </div>
      
      <div className="health-message">
        <p>{getHealthMessage(currentAQI.category)}</p>
      </div>
      
      <div className="aqi-scale">
        <div className="scale-item">
          <div className="scale-color" style={{ backgroundColor: '#009966' }}></div>
          <span>0-50 Good</span>
        </div>
        <div className="scale-item">
          <div className="scale-color" style={{ backgroundColor: '#FFDE33' }}></div>
          <span>51-100 Moderate</span>
        </div>
        <div className="scale-item">
          <div className="scale-color" style={{ backgroundColor: '#FF9933' }}></div>
          <span>101-150 Unhealthy for Sensitive</span>
        </div>
        <div className="scale-item">
          <div className="scale-color" style={{ backgroundColor: '#CC0033' }}></div>
          <span>151-200 Unhealthy</span>
        </div>
        <div className="scale-item">
          <div className="scale-color" style={{ backgroundColor: '#660099' }}></div>
          <span>201-300 Very Unhealthy</span>
        </div>
        <div className="scale-item">
          <div className="scale-color" style={{ backgroundColor: '#7E0023' }}></div>
          <span>301+ Hazardous</span>
        </div>
      </div>
    </div>
  );
};

export default AQICard;