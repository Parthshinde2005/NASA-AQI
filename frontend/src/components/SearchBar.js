import React, { useState } from 'react';
import { Search, Map, MapPin } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onToggleMap }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onSearch(`${latitude},${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter a city name.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name (e.g., New Delhi, India)"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
      
      <div className="action-buttons">
        <button onClick={handleCurrentLocation} className="location-button">
          <MapPin size={18} />
          Current Location
        </button>
        <button onClick={onToggleMap} className="map-button">
          <Map size={18} />
          Toggle Map
        </button>
      </div>
    </div>
  );
};

export default SearchBar;