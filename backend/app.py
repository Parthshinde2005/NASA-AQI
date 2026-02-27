from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import pandas as pd
from dateutil import parser
from datetime import datetime, timedelta
import math
import json

app = Flask(__name__)
CORS(app)

@app.route('/')
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "AirAware Backend API is running"})

def geocode_city(city_name, email=None):
    """Get latitude and longitude for a city name"""
    params = {"q": city_name, "format": "json", "limit": 1}
    if email:
        params["email"] = email
    
    resp = requests.get("https://nominatim.openstreetmap.org/search", 
                       params=params, 
                       headers={"User-Agent": "aqi-dashboard/1.0"})
    resp.raise_for_status()
    results = resp.json()
    
    if not results:
        raise ValueError(f"No geocoding result for: {city_name}")
    
    lat = float(results[0]["lat"])
    lon = float(results[0]["lon"])
    display_name = results[0].get("display_name", city_name)
    return lat, lon, display_name

PM25_BREAKPOINTS = [
    (0.0,   12.0,   0,   50),   # Good
    (12.1,  35.4,  51,  100),   # Moderate
    (35.5,  55.4, 101, 150),    # Unhealthy for Sensitive Groups
    (55.5, 150.4, 151, 200),    # Unhealthy
    (150.5,250.4, 201, 300),    # Very Unhealthy
    (250.5,350.4, 301, 400),
    (350.5,500.4, 401, 500),
]

def aqi_from_concentration(c, breakpoints=PM25_BREAKPOINTS):
    """Convert pollutant concentration (PM2.5 µg/m3) to AQI"""
    if c is None or (isinstance(c, float) and math.isnan(c)):
        return None
    
    if c < 0:
        c = 0.0
    
    for (C_lo, C_hi, I_lo, I_hi) in breakpoints:
        if C_lo <= c <= C_hi:
            aqi = ((I_hi - I_lo)/(C_hi - C_lo)) * (c - C_lo) + I_lo
            return int(round(aqi))
    
    # Above highest breakpoint
    C_lo, C_hi, I_lo, I_hi = breakpoints[-1]
    aqi = ((I_hi - I_lo)/(C_hi - C_lo)) * (min(c, C_hi) - C_lo) + I_lo
    return int(round(aqi))

def aqi_category(aqi):
    """Get AQI category and color"""
    if aqi is None:
        return {"category": "Unknown", "color": "#808080"}
    if aqi <= 50:
        return {"category": "Good", "color": "#009966"}
    if aqi <= 100:
        return {"category": "Moderate", "color": "#FFDE33"}
    if aqi <= 150:
        return {"category": "Unhealthy for Sensitive Groups", "color": "#FF9933"}
    if aqi <= 200:
        return {"category": "Unhealthy", "color": "#CC0033"}
    if aqi <= 300:
        return {"category": "Very Unhealthy", "color": "#660099"}
    return {"category": "Hazardous", "color": "#7E0023"}

def fetch_open_meteo_airquality(lat, lon, timezone="auto", hours=48):
    """Fetch air quality forecast from Open-Meteo API"""
    base = "https://air-quality-api.open-meteo.com/v1/air-quality"
    params = {
        "latitude": lat,
        "longitude": lon,
        "hourly": "pm2_5,pm10,nitrogen_dioxide,ozone,carbon_monoxide",
        "timezone": timezone
    }
    
    resp = requests.get(base, params=params, 
                       headers={"User-Agent": "aqi-dashboard/1.0"})
    resp.raise_for_status()
    j = resp.json()
    
    if "hourly" not in j:
        raise RuntimeError("No hourly data in Open-Meteo response")
    
    hourly = j["hourly"]
    times = [parser.isoparse(t) for t in hourly["time"]]
    df = pd.DataFrame({"time": times})
    
    for key in ["pm2_5", "pm10", "nitrogen_dioxide", "ozone", "carbon_monoxide"]:
        if key in hourly:
            df[key] = hourly[key]
        else:
            df[key] = pd.NA
    
    # Restrict to next N hours from now
    now = datetime.now(times[0].tzinfo) if len(times) > 0 else datetime.utcnow()
    df = df[df["time"] >= now]
    df = df.sort_values("time").head(hours).reset_index(drop=True)
    
    return df

@app.route('/api/forecast', methods=['GET'])
def get_forecast():
    """Get AQI forecast for a city"""
    try:
        city = request.args.get('city')
        if not city:
            return jsonify({"error": "City parameter is required"}), 400
        
        # Get coordinates
        lat, lon, display_name = geocode_city(city)
        
        # Get forecast data
        df = fetch_open_meteo_airquality(lat, lon, hours=48)
        
        # Calculate AQI
        df["pm2_5_aqi"] = df["pm2_5"].apply(
            lambda x: aqi_from_concentration(float(x)) if pd.notna(x) else None
        )
        
        # Prepare response data
        forecast_data = []
        current_aqi = None
        
        for _, row in df.iterrows():
            aqi_val = row["pm2_5_aqi"]
            category_info = aqi_category(aqi_val)
            
            data_point = {
                "time": row["time"].isoformat(),
                "pm2_5": float(row["pm2_5"]) if pd.notna(row["pm2_5"]) else None,
                "pm10": float(row["pm10"]) if pd.notna(row["pm10"]) else None,
                "aqi": aqi_val,
                "category": category_info["category"],
                "color": category_info["color"]
            }
            forecast_data.append(data_point)
            
            # Set current AQI (first data point)
            if current_aqi is None and aqi_val is not None:
                current_aqi = {
                    "value": aqi_val,
                    "category": category_info["category"],
                    "color": category_info["color"]
                }
        
        return jsonify({
            "city": display_name,
            "coordinates": {"lat": lat, "lon": lon},
            "current_aqi": current_aqi,
            "forecast": forecast_data
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/weather', methods=['GET'])
def get_weather():
    """Get current weather data"""
    try:
        city = request.args.get('city')
        if not city:
            return jsonify({"error": "City parameter is required"}), 400
        
        lat, lon, display_name = geocode_city(city)
        
        # Get weather from Open-Meteo
        weather_url = "https://api.open-meteo.com/v1/forecast"
        params = {
            "latitude": lat,
            "longitude": lon,
            "current": "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
            "timezone": "auto"
        }
        
        resp = requests.get(weather_url, params=params)
        resp.raise_for_status()
        weather_data = resp.json()
        
        current = weather_data.get("current", {})
        
        return jsonify({
            "temperature": current.get("temperature_2m"),
            "humidity": current.get("relative_humidity_2m"),
            "wind_speed": current.get("wind_speed_10m"),
            "weather_code": current.get("weather_code")
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)