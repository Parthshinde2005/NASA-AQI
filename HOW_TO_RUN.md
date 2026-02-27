# 🚀 How to Run AirAware Dashboard

## ✅ **Project Status: READY TO RUN**

Your AirAware Dashboard is fully tested and ready! All components are connected and working properly.

---

## 🎯 **Quick Start (Choose One Method)**

### **Method 1: One-Click Start (Easiest)**
1. **Double-click** `start_application.bat`
2. **Wait 30 seconds** for both servers to start
3. **Open browser** to: http://localhost:3000

### **Method 2: Manual Start**
```bash
# Terminal 1 - Start Backend
cd backend
python app.py

# Terminal 2 - Start Frontend
cd frontend
npm start
```

### **Method 3: Individual Services**
```bash
# Backend only
start_backend.bat

# Frontend only
start_frontend.bat
```

---

## 🌐 **Access Your Dashboard**

- **Main Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/

---

## 🧪 **Verify Everything Works**

```bash
# Run complete test suite
python run_full_test.py

# Check health status
python health_check.py
```

---

## 🎨 **What You'll See**

### **Dashboard Features**
- 🔍 **Search Bar**: Enter any city (e.g., "London, UK", "New Delhi, India")
- 📊 **AQI Card**: Current air quality with bright color coding
- 📈 **48-Hour Chart**: Interactive forecast with hover details
- 🌦️ **Weather Info**: Temperature, humidity, wind speed
- 🗺️ **Interactive Map**: Click "Toggle Map" to see AQI markers
- 🚨 **Health Alerts**: Automatic warnings for poor air quality

### **Color Scheme**
- **Good (0-50)**: Bright Green 🟢
- **Moderate (51-100)**: Bright Yellow 🟡
- **Unhealthy for Sensitive (101-150)**: Bright Orange 🟠
- **Unhealthy (151-200)**: Bright Red 🔴
- **Very Unhealthy (201-300)**: Bright Purple 🟣
- **Hazardous (301+)**: Dark Red ⚫

---

## 🔧 **Troubleshooting**

### **If Backend Won't Start**
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### **If Frontend Won't Start**
```bash
cd frontend
npm install
npm start
```

### **If APIs Don't Work**
- Check internet connection
- Try different city names
- Restart both servers

---

## 📱 **Usage Examples**

1. **Search for London**: Type "London, UK" → See current AQI and forecast
2. **Check Delhi**: Type "New Delhi, India" → View pollution levels
3. **Use Current Location**: Click "Current Location" button
4. **View Map**: Click "Toggle Map" → See geographic AQI data
5. **Get Alerts**: Automatic warnings when AQI > 150

---

## 🎉 **You're All Set!**

Your AirAware Dashboard includes:
- ✅ **Working Backend** with real-time AQI data
- ✅ **Modern Frontend** with interactive charts
- ✅ **Health Alerts** for air quality warnings
- ✅ **Interactive Maps** with AQI visualization
- ✅ **Responsive Design** for mobile and desktop
- ✅ **48-Hour Forecasting** with ML predictions

**Just run `start_application.bat` and enjoy your AQI dashboard!** 🌟