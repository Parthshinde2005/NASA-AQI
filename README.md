# AirAware - 48-Hour AQI Forecast Dashboard 🌫️

A modern, interactive air quality monitoring dashboard that provides real-time AQI data and 48-hour forecasts with beautiful visualizations.

## 🌟 Features

- **Real-time AQI Data**: Current air quality index with color-coded categories
- **48-Hour Forecast**: Detailed hourly predictions using machine learning
- **Interactive Charts**: Beautiful line charts showing AQI trends
- **Weather Integration**: Temperature, humidity, and wind speed data
- **Interactive Map**: Leaflet.js map with AQI markers and heatmap visualization
- **Health Alerts**: Dynamic warnings based on air quality levels
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Bright Color Scheme**: Eye-catching, modern UI with glassmorphism effects

## 🚀 Quick Start

### Prerequisites
- Python 3.7+ 
- Node.js 14+
- npm or yarn

### Option 1: Using Batch Files (Windows)

1. **Start Backend**:
   ```bash
   double-click start_backend.bat
   ```

2. **Start Frontend** (in a new terminal):
   ```bash
   double-click start_frontend.bat
   ```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🎨 Color Scheme

The dashboard uses a bright, modern color palette:

- **Good (0-50)**: Bright Green `#009966`
- **Moderate (51-100)**: Bright Yellow `#FFDE33`
- **Unhealthy for Sensitive (101-150)**: Bright Orange `#FF9933`
- **Unhealthy (151-200)**: Bright Red `#CC0033`
- **Very Unhealthy (201-300)**: Bright Purple `#660099`
- **Hazardous (301+)**: Dark Red `#7E0023`

## 📊 API Endpoints

### GET /api/forecast
Get 48-hour AQI forecast for a city
```
Parameters: city (string) - City name or coordinates
Response: JSON with forecast data, current AQI, and coordinates
```

### GET /api/weather
Get current weather conditions
```
Parameters: city (string) - City name or coordinates  
Response: JSON with temperature, humidity, wind speed
```

## 🛠️ Technology Stack

### Backend
- **Flask**: Web framework
- **Pandas**: Data processing
- **Requests**: API calls
- **Open-Meteo API**: Weather and air quality data
- **Nominatim**: Geocoding service

### Frontend
- **React 18**: UI framework
- **Recharts**: Chart visualization
- **Leaflet.js**: Interactive maps
- **React-Leaflet**: React integration for maps
- **Lucide React**: Modern icons
- **React-Toastify**: Notifications

## 🌍 Data Sources

- **Air Quality**: Open-Meteo Air Quality API
- **Weather**: Open-Meteo Weather API  
- **Geocoding**: OpenStreetMap Nominatim
- **Maps**: OpenStreetMap tiles

## 📱 Features in Detail

### 🔍 Search Functionality
- Search by city name (e.g., "New Delhi, India")
- Current location detection
- Auto-complete suggestions

### 📈 Interactive Charts
- 48-hour AQI forecast line chart
- Hover tooltips with detailed information
- Color-coded data points
- Reference lines for AQI categories

### 🗺️ Interactive Map
- Real-time AQI markers
- Color-coded based on air quality levels
- Popup information on click
- Zoom and pan functionality

### 🚨 Health Alerts
- Dynamic alert banners
- Color-coded warnings
- Health recommendations
- Toast notifications for dangerous levels

### 📊 Weather Integration
- Current temperature, humidity, wind speed
- Weather condition icons
- Impact explanation on air quality

## 🎯 Usage Examples

1. **Search for a city**: Enter "London, UK" in the search bar
2. **View current AQI**: See the large AQI card with color coding
3. **Check forecast**: Examine the 48-hour prediction chart
4. **Toggle map**: Click "Toggle Map" to see geographic visualization
5. **Get alerts**: Receive automatic health warnings for poor air quality

## 🔧 Troubleshooting

### Common Issues

1. **Backend not starting**:
   - Check Python installation: `python --version`
   - Install dependencies: `pip install -r requirements.txt`

2. **Frontend not loading**:
   - Check Node.js installation: `node --version`
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

3. **API errors**:
   - Check internet connection
   - Verify city name spelling
   - Try different city names

4. **Map not displaying**:
   - Check browser console for errors
   - Ensure internet connection for map tiles

## 🚀 Deployment

### Production Build
```bash
cd frontend
npm run build
```

### Environment Variables
Create `.env` files for production:

Backend `.env`:
```
FLASK_ENV=production
PORT=5000
```

Frontend `.env`:
```
REACT_APP_API_URL=http://your-backend-url
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Open an issue on GitHub
- Review the API documentation

---

**Made with ❤️ for cleaner air awareness**