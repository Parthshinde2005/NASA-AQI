# 🚀 AirAware - Quick Start Guide

## 🎯 What You've Got

A complete **AQI Prediction and Visualization Dashboard** with:

- **Backend**: Flask API with 48-hour AQI forecasting
- **Frontend**: Modern React dashboard with bright colors and interactive charts
- **Features**: Real-time data, weather integration, interactive maps, health alerts

## 🏃‍♂️ Quick Start (3 Options)

### Option 1: One-Click Startup (Recommended)
```bash
# Double-click this file:
start_application.bat
```

### Option 2: Manual Startup
```bash
# Terminal 1 - Backend
cd backend
pip install -r requirements.txt
python app.py

# Terminal 2 - Frontend  
cd frontend
npm install
npm start
```

### Option 3: Individual Services
```bash
# Backend only
start_backend.bat

# Frontend only  
start_frontend.bat
```

## 🌐 Access Points

- **Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🧪 Testing

```bash
# Run complete test suite
python run_full_test.py

# Check health status
python health_check.py
```

## 🎨 Features Showcase

### 🔍 Search & Location
- Search any city worldwide
- Use current location
- Auto-complete suggestions

### 📊 AQI Dashboard
- **Current AQI**: Large color-coded display
- **48-Hour Forecast**: Interactive line chart
- **Health Alerts**: Dynamic warnings with recommendations
- **Weather Data**: Temperature, humidity, wind speed

### 🗺️ Interactive Map
- Real-time AQI markers
- Color-coded based on air quality
- Zoom and pan functionality
- Popup details on click

### 🎨 Bright Color Scheme
- **Good (0-50)**: Bright Green `#009966`
- **Moderate (51-100)**: Bright Yellow `#FFDE33`  
- **Unhealthy for Sensitive (101-150)**: Bright Orange `#FF9933`
- **Unhealthy (151-200)**: Bright Red `#CC0033`
- **Very Unhealthy (201-300)**: Bright Purple `#660099`
- **Hazardous (301+)**: Dark Red `#7E0023`

## 🛠️ Tech Stack

**Backend**: Flask + Pandas + Open-Meteo API
**Frontend**: React + Recharts + Leaflet.js + Glassmorphism UI

## 🐛 Troubleshooting

### Backend Issues
```bash
# Check Python version (need 3.7+)
python --version

# Reinstall dependencies
cd backend
pip install --upgrade -r requirements.txt
```

### Frontend Issues  
```bash
# Check Node.js version (need 14+)
node --version

# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### API Issues
- Check internet connection
- Try different city names
- Verify APIs are accessible

## 🚀 Usage Examples

1. **Search Delhi**: Enter "New Delhi, India"
2. **View AQI**: See current air quality with color coding
3. **Check Forecast**: Examine 48-hour predictions
4. **Toggle Map**: Click to see geographic visualization
5. **Get Alerts**: Receive health warnings for poor air quality

## 📱 Mobile Support

The dashboard is fully responsive and works on:
- Desktop browsers
- Mobile phones  
- Tablets

## 🌟 Next Steps

1. **Start the application** using `start_application.bat`
2. **Open browser** to http://localhost:3000
3. **Search for your city** and explore the features
4. **Check the map view** for geographic visualization
5. **Monitor health alerts** for air quality warnings

---

**Made with ❤️ for cleaner air awareness**

🌫️ **AirAware** - Your 48-Hour AQI Forecast Companion