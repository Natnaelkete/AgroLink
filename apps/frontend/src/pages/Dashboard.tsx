import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext'; 
import { Link } from 'react-router-dom';
import {
  Cloud,
  Sun,
  Droplets,
  Thermometer,
  Sprout,
  TrendingUp,
  AlertTriangle,
  Calendar,
  ShoppingCart,
  Clock,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Minus,
  Activity
} from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  forecast: string;
}

interface CropHealthData {
  healthy: number;
  warning: number;
  critical: number;
}

interface MarketData {
  crop: string;
  price: number;
  trend: "up" | "down" | "stable";
  change: number;
}

interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

interface DashboardData {
  weather: WeatherData;
  cropHealth: CropHealthData;
  market: MarketData[];
  tasks: Task[];
  recentActivity: string[];
}

const Dashboard = () => {
  const { t } = useTranslation();
  const { token, userId, loading: authLoading, signOut } = useAuth(); 
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const mockDashboardData: DashboardData = {
    weather: {
      temperature: 24,
      humidity: 65,
      rainfall: 2.5,
      forecast: "Partly cloudy with a chance of rain"
    },
    cropHealth: { healthy: 78, warning: 15, critical: 7 },
    market: [
      { crop: "Teff", price: 1200, trend: "up", change: 5.2 },
      { crop: "Maize", price: 800, trend: "down", change: 3.1 },
      { crop: "Wheat", price: 950, trend: "stable", change: 0 },
      { crop: "Barley", price: 700, trend: "up", change: 2.4 },
      { crop: "Sorghum", price: 650, trend: "down", change: 1.8 }
    ],
    tasks: [
      { id: 1, title: "Irrigate maize field", dueDate: "2024-01-20", priority: "high", completed: false },
      { id: 2, title: "Apply fertilizer to teff", dueDate: "2024-01-22", priority: "medium", completed: false },
      { id: 3, title: "Check soil moisture levels", dueDate: "2024-01-18", priority: "high", completed: true },
      { id: 4, title: "Harvest wheat section A", dueDate: "2024-01-25", priority: "medium", completed: false }
    ],
    recentActivity: [
      "Soil analysis completed for Field B",
      "New pest alert: Armyworms detected",
      "Irrigation system maintenance scheduled",
      "Market price update received"
    ]
  };

  useEffect(() => {
    if (authLoading) return;

    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);

      if (!userId || !token) {
        setIsLoading(false);
        setError("User not authenticated. Please log in.");
        return;
      }

      // Simulate API call delay
      setTimeout(() => {
        setDashboardData(mockDashboardData);
        setIsLoading(false);
      }, 1500);

      // Uncomment below for real API integration
      /*
      if (!("geolocation" in navigator)) {
        setError("Geolocation is not supported by your browser.");
        setIsLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Your actual API call here
            const response = await axios.post(
              'http://localhost:5000/api/weather-prediction/advice',
              { lat: latitude, lon: longitude },
              { headers: { 'Authorization': `Bearer ${token}` } }
            );
            // Process response...
          } catch (err) {
            // Error handling...
          }
        },
        (geoError) => {
          console.error("Geolocation error:", geoError);
          setIsLoading(false);
          setError("Could not retrieve your location. Please enable location services.");
        }
      );
      */
    };

    fetchDashboardData();
  }, [authLoading, userId, token, signOut]);

  const handleTaskToggle = (taskId: number) => {
    setDashboardData(prev => prev ? {
      ...prev,
      tasks: prev.tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    } : null);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <ArrowUp className="w-4 h-4 text-green-500" />;
      case "down": return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gradient-to-br from-green-50 to-yellow-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700 font-medium">Loading your farm dashboard...</p>
          <p className="text-green-600 text-sm">Preparing real-time data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gradient-to-br from-green-50 to-yellow-50 min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-6 bg-gradient-to-br from-green-50 to-yellow-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No data available. Please check your connection.</p>
        </div>
      </div>
    );
  }

  const { weather, cropHealth, market, tasks, recentActivity } = dashboardData;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-yellow-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Farm Dashboard 
              {locationName && <span className="text-green-600"> - {locationName}</span>}
            </h1>
            <p className="text-gray-600">Welcome back! Here's your farm overview for today.</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="font-semibold text-gray-800">Just now</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Fields</p>
                <p className="text-2xl font-bold text-gray-800">12</p>
              </div>
              <Sprout className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Crops Growing</p>
                <p className="text-2xl font-bold text-gray-800">8</p>
              </div>
              <Activity className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">This Month's Yield</p>
                <p className="text-2xl font-bold text-gray-800">2.4T</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Water Usage</p>
                <p className="text-2xl font-bold text-gray-800">84%</p>
              </div>
              <Droplets className="w-8 h-8 text-cyan-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Weather & Tasks */}
        <div className="xl:col-span-2 space-y-6">
          {/* Weather & Crop Health Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weather Card */}
            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Cloud className="w-6 h-6 text-yellow-500 mr-2" />
                  Weather Today
                </h2>
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-5 h-5 text-red-500" />
                  <span className="text-2xl font-bold text-gray-800">{weather.temperature}°C</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Humidity</span>
                  <span className="font-semibold">{weather.humidity}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rainfall</span>
                  <span className="font-semibold">{weather.rainfall}mm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Condition</span>
                  <span className="font-semibold text-yellow-600">{weather.forecast}</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-700">
                  <Sun className="w-4 h-4 inline mr-1" />
                  Good day for outdoor farming activities
                </p>
              </div>
            </div>

            {/* Crop Health Card */}
            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Sprout className="w-6 h-6 text-green-500 mr-2" />
                Crop Health Status
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Healthy</span>
                  </div>
                  <span className="font-bold text-green-600">{cropHealth.healthy}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span>Warning</span>
                  </div>
                  <span className="font-bold text-yellow-600">{cropHealth.warning}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span>Critical</span>
                  </div>
                  <span className="font-bold text-red-600">{cropHealth.critical}%</span>
                </div>
              </div>
              <div className="mt-4 bg-gradient-to-r from-green-500 to-yellow-500 h-3 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500" 
                  style={{ width: `${cropHealth.healthy}%` }}
                ></div>
                <div 
                  className="h-full bg-yellow-500 -mt-3" 
                  style={{ width: `${cropHealth.warning}%`, marginLeft: `${cropHealth.healthy}%` }}
                ></div>
                <div 
                  className="h-full bg-red-500 -mt-3" 
                  style={{ width: `${cropHealth.critical}%`, marginLeft: `${cropHealth.healthy + cropHealth.warning}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Tasks Section */}
          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-2" />
                Today's Tasks
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {completedTasks} of {tasks.length} completed
                </span>
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-green-500 rounded-full" 
                    style={{ width: `${(completedTasks / tasks.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleTaskToggle(task.id)}
                      className={`w-5 h-5 rounded border flex items-center justify-center ${
                        task.completed 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-gray-300'
                      }`}
                    >
                      {task.completed && '✓'}
                    </button>
                    <div>
                      <p className={`font-medium ${task.completed ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                        {task.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Link 
                to="/disease-detection"
                className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl text-center transition-all hover:scale-105"
              >
                <Activity className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">Disease Detection</p>
              </Link>
              <Link 
                to="/weather-detector"
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-xl text-center transition-all hover:scale-105"
              >
                <Cloud className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">Weather Forecast</p>
              </Link>
              <Link 
                to="/soil-advice"
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-xl text-center transition-all hover:scale-105"
              >
                <Sprout className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">Crop Advice</p>
              </Link>
              <Link 
                to="/products"
                className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-xl text-center transition-all hover:scale-105"
              >
                <ShoppingCart className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">Market Prices</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Market & Activity */}
        <div className="space-y-6">
          {/* Market Prices */}
          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
              Market Prices (ETB/quintal)
            </h2>
            <div className="space-y-3">
              {market.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{item.crop}</p>
                    <p className="text-sm text-gray-600">Current: ETB {item.price}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      {getTrendIcon(item.trend)}
                      <span className={`font-semibold ${
                        item.trend === "up" ? "text-green-600" : 
                        item.trend === "down" ? "text-red-600" : "text-gray-600"
                      }`}>
                        {item.change}%
                      </span>
                    </div>
                    <p className={`text-xs ${
                      item.trend === "up" ? "text-green-600" : 
                      item.trend === "down" ? "text-red-600" : "text-gray-600"
                    }`}>
                      {item.trend === "up" ? "Increasing" : item.trend === "down" ? "Decreasing" : "Stable"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="w-6 h-6 text-yellow-500 mr-2" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-700">{activity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Forecast */}
          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Calendar className="w-6 h-6 text-orange-500 mr-2" />
              7-Day Forecast
            </h2>
            <div className="grid grid-cols-7 gap-2">
              {[22, 24, 21, 20, 19, 23, 25].map((temp, index) => (
                <div key={index} className="text-center">
                  <p className="text-xs text-gray-500 font-medium">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}
                  </p>
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mx-auto my-2">
                    <span className="text-yellow-600 text-sm font-bold">{temp}°</span>
                  </div>
                  <p className="text-xs text-gray-600">Sunny</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;