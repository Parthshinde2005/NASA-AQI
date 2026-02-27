import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import './ForecastChart.css';

const ForecastChart = ({ forecastData }) => {
  if (!forecastData || forecastData.length === 0) {
    return (
      <div className="card forecast-chart">
        <h2>48-Hour AQI Forecast</h2>
        <div className="chart-loading">
          <p>Loading forecast data...</p>
        </div>
      </div>
    );
  }

  // Prepare data for chart
  const chartData = forecastData.map((item, index) => {
    const date = new Date(item.time);
    const timeLabel = index % 4 === 0 ? 
      `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:00` : 
      `${date.getHours()}:00`;
    
    return {
      time: timeLabel,
      aqi: item.aqi,
      fullTime: item.time,
      category: item.category,
      color: item.color
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const date = new Date(data.fullTime);
      
      return (
        <div className="custom-tooltip">
          <p className="tooltip-time">
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </p>
          <p className="tooltip-aqi" style={{ color: data.color }}>
            AQI: {data.aqi}
          </p>
          <p className="tooltip-category">
            {data.category}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={4} 
        fill={payload.color} 
        stroke="#fff" 
        strokeWidth={2}
      />
    );
  };

  return (
    <div className="card forecast-chart">
      <div className="chart-header">
        <h2>48-Hour AQI Forecast</h2>
        <p className="chart-subtitle">Hourly air quality predictions</p>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis 
              dataKey="time" 
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
              stroke="#666"
            />
            <YAxis 
              domain={[0, 'dataMax + 50']}
              fontSize={12}
              stroke="#666"
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Reference lines for AQI categories */}
            <ReferenceLine y={50} stroke="#009966" strokeDasharray="2 2" />
            <ReferenceLine y={100} stroke="#FFDE33" strokeDasharray="2 2" />
            <ReferenceLine y={150} stroke="#FF9933" strokeDasharray="2 2" />
            <ReferenceLine y={200} stroke="#CC0033" strokeDasharray="2 2" />
            <ReferenceLine y={300} stroke="#660099" strokeDasharray="2 2" />
            
            <Line 
              type="monotone" 
              dataKey="aqi" 
              stroke="#667eea" 
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={{ r: 6, stroke: '#667eea', strokeWidth: 2, fill: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-line" style={{ backgroundColor: '#009966' }}></div>
          <span>Good (0-50)</span>
        </div>
        <div className="legend-item">
          <div className="legend-line" style={{ backgroundColor: '#FFDE33' }}></div>
          <span>Moderate (51-100)</span>
        </div>
        <div className="legend-item">
          <div className="legend-line" style={{ backgroundColor: '#FF9933' }}></div>
          <span>Unhealthy for Sensitive (101-150)</span>
        </div>
        <div className="legend-item">
          <div className="legend-line" style={{ backgroundColor: '#CC0033' }}></div>
          <span>Unhealthy (151-200)</span>
        </div>
        <div className="legend-item">
          <div className="legend-line" style={{ backgroundColor: '#660099' }}></div>
          <span>Very Unhealthy (201-300)</span>
        </div>
      </div>
    </div>
  );
};

export default ForecastChart;