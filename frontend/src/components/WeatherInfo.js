import React from 'react';
import { Thermometer, Droplets, Wind, Cloud } from 'lucide-react';
import './WeatherInfo.css';

const WeatherInfo = ({ weatherData }) => {
  const getWeatherIcon = (code) => {
    // Simplified weather code mapping
    if (!code) return <Cloud size={24} />;
    if (code <= 3) return <Cloud size={24} />;
    return <Cloud size={24} />;
  };

  if (!weatherData) {
    return (
      <div className="card weather-info">
        <h3>Weather Conditions</h3>
        <div className="weather-loading">
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card weather-info">
      <h3>Current Weather</h3>
      
      <div className="weather-grid">
        <div className="weather-item">
          <div className="weather-icon temperature">
            <Thermometer size={24} />
          </div>
          <div className="weather-details">
            <span className="weather-label">Temperature</span>
            <span className="weather-value">
              {weatherData.temperature ? `${weatherData.temperature}°C` : 'N/A'}
            </span>
          </div>
        </div>
        
        <div className="weather-item">
          <div className="weather-icon humidity">
            <Droplets size={24} />
          </div>
          <div className="weather-details">
            <span className="weather-label">Humidity</span>
            <span className="weather-value">
              {weatherData.humidity ? `${weatherData.humidity}%` : 'N/A'}
            </span>
          </div>
        </div>
        
        <div className="weather-item">
          <div className="weather-icon wind">
            <Wind size={24} />
          </div>
          <div className="weather-details">
            <span className="weather-label">Wind Speed</span>
            <span className="weather-value">
              {weatherData.wind_speed ? `${weatherData.wind_speed} km/h` : 'N/A'}
            </span>
          </div>
        </div>
        
        <div className="weather-item">
          <div className="weather-icon weather">
            {getWeatherIcon(weatherData.weather_code)}
          </div>
          <div className="weather-details">
            <span className="weather-label">Conditions</span>
            <span className="weather-value">
              {weatherData.weather_code ? 'Clear' : 'N/A'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="weather-note">
        <p>Weather conditions affect air quality. High humidity and low wind speed can worsen air pollution.</p>
      </div>
    </div>
  );
};

export default WeatherInfo;