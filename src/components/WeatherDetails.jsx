import React from 'react';

export default function WeatherDetails({ current }) {
  const details = [
    { label: 'Feels Like', value: `${Math.round(current.apparent_temperature)}°C` },
    { label: 'Humidity', value: `${current.relative_humidity_2m}%` },
    { label: 'Wind Speed', value: `${current.wind_speed_10m} km/h` },
    { label: 'Time', value: current.is_day ? 'Day' : 'Night' },
  ];

  return (
    <div className="weather-details">
      {details.map((detail) => (
        <div className="detail-card" key={detail.label}>
          <p>{detail.label}</p>
          <strong>{detail.value}</strong>
        </div>
      ))}
    </div>
  );
}
