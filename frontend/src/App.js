import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import AQICard from './components/AQICard';
import ForecastChart from './components/ForecastChart';
import WeatherInfo from './components/WeatherInfo';
import Heatmap from './components/Heatmap';
import AlertBanner from './components/AlertBanner';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentCity, setCurrentCity] = useState('New Delhi, India');
  const [forecastData, setForecastData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const fetchData = async (city) => {
    setLoading(true);
    try {
      // Fetch AQI forecast
      const forecastResponse = await fetch(`/api/forecast?city=${encodeURIComponent(city)}`);
      if (!forecastResponse.ok) {
        throw new Error('Failed to fetch forecast data');
      }
      const forecast = await forecastResponse.json();
      setForecastData(forecast);

      // Fetch weather data
      const weatherResponse = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const weather = await weatherResponse.json();
      setWeatherData(weather);

      // Show health alert if AQI is unhealthy
      if (forecast.current_aqi && forecast.current_aqi.value > 150) {
        toast.warn(`Air quality is ${forecast.current_aqi.category}! Limit outdoor activities.`, {
          position: "top-center",
          autoClose: 5000,
        });
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentCity);
  }, [currentCity]);

  const handleCitySearch = (city) => {
    setCurrentCity(city);
    fetchData(city);
  };

  return (
    <div className="App">
      <div className="gradient-bg">
        <Header />
        
        <div className="container">
          <SearchBar onSearch={handleCitySearch} onToggleMap={() => setShowMap(!showMap)} />
          
          {loading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading air quality data...</p>
            </div>
          )}

          {!loading && forecastData && (
            <>
              <AlertBanner currentAQI={forecastData.current_aqi} />
              
              <div className="main-content">
                <div className="left-panel">
                  <AQICard 
                    city={forecastData.city}
                    currentAQI={forecastData.current_aqi}
                  />
                  
                  <WeatherInfo weatherData={weatherData} />
                </div>
                
                <div className="right-panel">
                  <ForecastChart forecastData={forecastData.forecast} />
                </div>
              </div>

              {showMap && (
                <div className="map-section">
                  <Heatmap 
                    coordinates={forecastData.coordinates}
                    forecastData={forecastData.forecast}
                  />
                </div>
              )}
            </>
          )}
        </div>
        
        <Footer />
      </div>
      
      <ToastContainer />
    </div>
  );
}

export default App;