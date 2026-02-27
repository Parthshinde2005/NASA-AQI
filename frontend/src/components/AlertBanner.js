import React from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import './AlertBanner.css';

const AlertBanner = ({ currentAQI }) => {
  if (!currentAQI) return null;

  const getAlertLevel = (aqi) => {
    if (aqi <= 50) return 'good';
    if (aqi <= 100) return 'moderate';
    if (aqi <= 150) return 'warning';
    return 'danger';
  };

  const getAlertIcon = (level) => {
    switch (level) {
      case 'good': return <CheckCircle size={20} />;
      case 'moderate': return <Info size={20} />;
      case 'warning': return <AlertTriangle size={20} />;
      case 'danger': return <XCircle size={20} />;
      default: return <Info size={20} />;
    }
  };

  const getHealthRecommendation = (category) => {
    const recommendations = {
      'Good': 'Perfect day for outdoor activities! Air quality is excellent.',
      'Moderate': 'Air quality is acceptable. Sensitive individuals should consider limiting prolonged outdoor exertion.',
      'Unhealthy for Sensitive Groups': 'Sensitive groups should reduce outdoor activities. Others can continue normal activities.',
      'Unhealthy': 'Everyone should limit outdoor activities, especially prolonged exertion.',
      'Very Unhealthy': 'Avoid outdoor activities. Stay indoors and keep windows closed.',
      'Hazardous': 'Emergency conditions! Everyone should remain indoors and avoid all outdoor activities.'
    };
    return recommendations[category] || 'Monitor air quality conditions.';
  };

  const alertLevel = getAlertLevel(currentAQI.value);

  return (
    <div className={`alert-banner alert-${alertLevel}`}>
      <div className="alert-content">
        <div className="alert-icon">
          {getAlertIcon(alertLevel)}
        </div>
        <div className="alert-text">
          <div className="alert-title">
            Air Quality Alert: {currentAQI.category}
          </div>
          <div className="alert-message">
            {getHealthRecommendation(currentAQI.category)}
          </div>
        </div>
        <div className="alert-aqi">
          <span className="aqi-label">AQI</span>
          <span className="aqi-value">{currentAQI.value}</span>
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;