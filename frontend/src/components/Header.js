import React from 'react';
import { Wind } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Wind size={32} color="#fff" />
            <h1>AirAware</h1>
          </div>
          <div className="tagline">
            <span>48-Hour AQI Forecast & Visualization</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;