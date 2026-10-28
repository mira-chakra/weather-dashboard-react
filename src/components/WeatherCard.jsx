import React from 'react';
import WeatherDetails from './WeatherDetails.jsx';
import { getWeatherDescription, getWeatherIcon } from '../weatherInfo.js';

export default function WeatherCard({ weather }) {
  const { current } = weather;

  return (
    <section className="weather-card" aria-label="Current weather">
      <div className="weather-top">
        <div>
          <p className="current-label">Current Weather</p>
          <h2>{weather.placeName}</h2>
        </div>
        <div className="weather-icon-box" aria-label={getWeatherDescription(current.weather_code)}>
          <span aria-hidden="true">{getWeatherIcon(current.weather_code)}</span>
        </div>
      </div>

      <div className="temperature-section">
        <p className="temperature">{Math.round(current.temperature_2m)}°C</p>
        <p className="weather-description">{getWeatherDescription(current.weather_code)}</p>
      </div>

      <WeatherDetails current={current} />
    </section>
  );
}
