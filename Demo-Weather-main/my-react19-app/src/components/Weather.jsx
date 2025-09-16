// console.log("VITE_APP_ID from env:", import.meta.env);
console.log("All env:", import.meta.env);
console.log("VITE_APP_ID:", import.meta.env.VITE_APP_ID);

import React, { useState, useEffect, useRef } from 'react';
import './Weather.css';

import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcon = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon
  };

  const search = async (city) => {
  const apiKey = import.meta.env.VITE_APP_ID;
  console.log("Loaded API Key:", apiKey);

  if (!apiKey) {
    alert("API key is missing. Check your .env file and restart the dev server.");
    return;
  }

  if (city.trim() === "") {
    alert("Enter City Name");
    return;
  }

  try {
const apiKey = import.meta.env.VITE_APP_ID;
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;   
 const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to fetch weather data.");
      return;
    }

    const icon = allIcon[data.weather[0].icon] || clear_icon;

    setWeatherData({
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      temperature: Math.floor(data.main.temp),
      location: data.name,
      icon: icon
    });
  } catch (error) {
    console.error("Error in fetching weather data", error);
    setWeatherData(false);
  }
};


  useEffect(() => {
    search("New York");
  }, []);

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input
          ref={inputRef}
          type='text'
          placeholder='Search city'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              search(inputRef.current.value);
            }
          }}
        />
        <img src={search_icon} alt="search" onClick={() => search(inputRef.current.value)} />
      </div>

      {weatherData && (
        <>
          <img src={weatherData.icon} alt='weather icon' className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={humidity_icon} alt='humidity icon' />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} alt='wind icon' />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
