import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Data Sources</h4>
            <div className="data-sources">
              <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="source-link">
                <ExternalLink size={16} />
                Open-Meteo API
              </a>
              <a href="https://nominatim.openstreetmap.org/" target="_blank" rel="noopener noreferrer" className="source-link">
                <ExternalLink size={16} />
                OpenStreetMap Nominatim
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>About AirAware</h4>
            <p>Real-time air quality monitoring and 48-hour forecasting to help you make informed decisions about outdoor activities.</p>
          </div>
          
          <div className="footer-section">
            <h4>Disclaimer</h4>
            <p>This data is for informational purposes only. For official air quality information, consult your local environmental agency.</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            <p>Made with <Heart size={16} className="heart-icon" /> for cleaner air awareness</p>
          </div>
          <div className="version">
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;