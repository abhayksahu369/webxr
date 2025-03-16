import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Main component
const SensorDashboard = () => {
  // State for storing sensor data
  const [sensorData, setSensorData] = useState([]);
  const [cumulativeData, setCumulativeData] = useState([]);
  const [selectedView, setSelectedView] = useState('realtime');
  const [timeRange, setTimeRange] = useState('1h');
  
  // Refs for charts
  const tempChartRef = useRef(null);
  const humidityChartRef = useRef(null);
  const vibrationChartRef = useRef(null);

  // Generate mock data for demonstration purposes
  useEffect(() => {
    // Mock data generation
    const generateMockData = () => {
      const now = new Date();
      const newDataPoint = {
        timestamp: now,
        temperature: 20 + Math.random() * 10, // Random temperature between 20-30°C
        humidity: 40 + Math.random() * 30, // Random humidity between 40-70%
        vibration: Math.random() * 5 // Random vibration between 0-5
      };
      
      setSensorData(prevData => {
        // Keep only the last 60 data points for real-time view
        const newData = [...prevData, newDataPoint];
        if (newData.length > 60) return newData.slice(-60);
        return newData;
      });
      
      setCumulativeData(prevData => {
        // Keep cumulative data for longer periods
        return [...prevData, newDataPoint].slice(-1000);
      });
    };
    
    // Generate initial data
    for (let i = 0; i < 60; i++) {
      const pastTime = new Date(Date.now() - (60 - i) * 1000);
      const dataPoint = {
        timestamp: pastTime,
        temperature: 20 + Math.random() * 10,
        humidity: 40 + Math.random() * 30,
        vibration: Math.random() * 5
      };
      setSensorData(prevData => [...prevData, dataPoint]);
      setCumulativeData(prevData => [...prevData, dataPoint]);
    }
    
    // Set up interval for new data generation
    const interval = setInterval(generateMockData, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update charts when data changes
  useEffect(() => {
    if (sensorData.length === 0) return;
    
    const data = selectedView === 'realtime' ? sensorData : filterDataByTimeRange(cumulativeData);
    
    // Sort data by timestamp to prevent straight lines in cumulative view
    const sortedData = [...data].sort((a, b) => a.timestamp - b.timestamp);
    
    if (tempChartRef.current) createOrUpdateChart(tempChartRef.current, sortedData, 'temperature', '#ff6b6b');
    if (humidityChartRef.current) createOrUpdateChart(humidityChartRef.current, sortedData, 'humidity', '#4ecdc4');
    if (vibrationChartRef.current) createOrUpdateChart(vibrationChartRef.current, sortedData, 'vibration', '#45b3e7');
  }, [sensorData, cumulativeData, selectedView, timeRange]);

  // Filter data based on selected time range
  const filterDataByTimeRange = (data) => {
    const now = new Date();
    const ranges = {
      '1h': 60 * 60 * 1000,
      '6h': 6 * 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000
    };
    
    const cutoff = new Date(now.getTime() - ranges[timeRange]);
    return data.filter(d => d.timestamp >= cutoff);
  };

  // Create or update a chart using D3
  const createOrUpdateChart = (element, data, metric, color) => {
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };
    const width = element.clientWidth - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;
    
    // Clear existing chart
    d3.select(element).selectAll("*").remove();
    
    // Create SVG element
    const svg = d3.select(element)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Create scales
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.timestamp))
      .range([0, width]);
    
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[metric]) * 1.1])
      .range([height, 0]);
    
    // Create grid lines
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3.axisBottom(x)
          .tickSize(-height)
          .tickFormat("")
      )
      .style("stroke", "rgba(70, 70, 80, 0.3)"); // Very subtle grid lines
    
    
    svg.append("g")
      .attr("class", "grid")
      .call(
        d3.axisLeft(y)
          .tickSize(-width)
          .tickFormat("")
      )
      .style("stroke", "rgba(70, 70, 80, 0.3)");
    
    // Create axes with light color for dark theme
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .attr("color", "#9ca3af") // Light gray for axis
      .selectAll("line")
      .style("stroke", "#9ca3af");
    
    svg.append("g")
      .call(d3.axisLeft(y))
      .attr("color", "#9ca3af") // Light gray for axis
      .selectAll("line")
      .style("stroke", "#9ca3af");
    
    // Create line generator with curve
    const line = d3.line()
      .x(d => x(d.timestamp))
      .y(d => y(d[metric]))
      .curve(d3.curveCatmullRom.alpha(0.5)); // Add smooth curve
    
    // Add line path
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 1.5)
      .attr("d", line);
    
    // Add points
    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d.timestamp))
      .attr("cy", d => y(d[metric]))
      .attr("r", 2.5) // Slightly smaller points
      .attr("fill", color);
  };

  // Calculate average values for the current dataset
  const getAverageValues = () => {
    const data = selectedView === 'realtime' ? sensorData : filterDataByTimeRange(cumulativeData);
    if (data.length === 0) return { temp: 0, humidity: 0, vibration: 0 };
    
    const tempSum = data.reduce((sum, point) => sum + point.temperature, 0);
    const humiditySum = data.reduce((sum, point) => sum + point.humidity, 0);
    const vibrationSum = data.reduce((sum, point) => sum + point.vibration, 0);
    
    return {
      temp: (tempSum / data.length).toFixed(1),
      humidity: (humiditySum / data.length).toFixed(1),
      vibration: (vibrationSum / data.length).toFixed(2)
    };
  };

  const averages = getAverageValues();

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-white">Sensor Data Dashboard</h1>
        
        {/* Controls */}
        {/* <div className="bg-gray-800 rounded-lg shadow-lg mb-6 p-4 flex flex-wrap items-center justify-between border border-gray-700">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedView('realtime')}
              className={`px-4 py-2 rounded ${selectedView === 'realtime' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Real-time Data
            </button>
            <button
              onClick={() => setSelectedView('cumulative')}
              className={`px-4 py-2 rounded ${selectedView === 'cumulative' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Cumulative Data
            </button>
          </div>
          
          {selectedView === 'cumulative' && (
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <span className="text-gray-300">Time Range:</span>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white"
              >
                <option value="1h">Last Hour</option>
                <option value="6h">Last 6 Hours</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>
          )}
        </div>
         */}
        {/* Stats Overview */}
              <div>
                  <div>
                      <h3>Temperature</h3>
                      <p>{averages.temp}°C</p>
                  </div>
                  <div>
                      <h3>Humidity</h3>
                      <p>{averages.humidity}%</p>
                  </div>
                  <div>
                      <h3>Vibration</h3>
                      <p>{averages.vibration}m/s²</p>
                  </div>
              </div>
        {/* Charts */}
        <div style={{height:"100px"}}>
                  <div>
                      <h3>Temperature (°C)</h3>
                      <div ref={tempChartRef}></div>
                  </div>

                  <div>
                      <h3>Humidity (%)</h3>
                      <div ref={humidityChartRef}></div>
                  </div>

                  <div>
                      <h3>Vibration</h3>
                      <div ref={vibrationChartRef}></div>
                  </div>
              </div>

        </div>
    
    </div>
  );
};

export default SensorDashboard;