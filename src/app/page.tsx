'use client'

import { useState, useEffect } from "react";

import WeatherData from "./components/weather-data";

export default function Home() {

  // State variables:
  //
  // userCity: The user's city
  // loaded: Whether the weather data has been loaded
  const [userCity, setUserCity] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);

  // Use effect to set the user's city based on their IP address
  useEffect(() => {
    // Determine the user's city based on their IP address
    const determineUserCity = async () => {
      // Try to determine the user's city based on their IP address
      try {
        // Fetch the user's IP address
        const responseIP = await fetch('/api/ip');
        const dataResponseIP = await responseIP.json();

        // Get the city from the IP address & set the user's city
        const responseCity = await fetch(`/api/city?ip=${dataResponseIP.ip}`);
        const dataResponseCity = await responseCity.json();
        console.log(dataResponseCity);

        setUserCity(dataResponseCity.city);
      } catch (error) {
        // If the user's city cannot be determined, set the user's city to "City"
        // and log the error
        setUserCity("City");
        console.error('Error determining user city:', error);
      }
    };

    determineUserCity();
  }, []);
  return (
    // Background gradient from blue to light blue
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      {/* Main Container */}
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-500 to-blue-600">
          {/* Logo */}
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
            <img src="/weather-logo-icon.svg" alt="Weather App" className="w-6 h-6" />
          </div>
          
          {/* Location Selector */}
          <div className="flex items-center space-x-2">
              <form className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-medium flex items-center justify-center space-x-4">
                <input type="text" defaultValue={userCity} className="w-32 h-8 bg-white/20 backdrop-blur-sm rounded-full px-4 text-white placeholder-white/70"/>
                <button type="button" onClick={() => setLoaded(true)} className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
          </div>
        </div>

        {/* Weather Data */}
        <WeatherData loaded={loaded}/>
      </div>
    </div>
  );
}