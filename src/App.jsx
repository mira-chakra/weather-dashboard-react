import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import LoadingMessage from './components/LoadingMessage.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import WeatherCard from './components/WeatherCard.jsx';

// Open-Meteo uses one API to find a city's coordinates and another to get its weather.
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

// Make a readable place name from the API result.
function getPlaceName(place) {
  return `${place.name}, ${place.country}`;
}

export default function App() {
  // Keep the search input, selected city, weather, and page status in App.
  const [cityInput, setCityInput] = useState('Beirut');
  const [searchedCity, setSearchedCity] = useState('Beirut');
  const [searchNumber, setSearchNumber] = useState(0);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get the city's coordinates, then use them to request its current weather.
  useEffect(() => {
    if (!searchedCity) return;

    setLoading(true);
    setError('');
    setWeather(null);

    const geocodingUrl = `${GEOCODING_URL}?name=${encodeURIComponent(searchedCity)}&count=1&language=en&format=json`;

    fetch(geocodingUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Could not search for this city. Please try again.');
        return response.json();
      })
      .then((places) => {
        if (!places.results || places.results.length === 0) {
          throw new Error('City not found. Check the spelling and try again.');
        }

        const place = places.results[0];
        const forecastUrl = `${FORECAST_URL}?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=auto`;

        return fetch(forecastUrl).then((response) => {
          if (!response.ok) throw new Error('Could not load the weather. Please try again.');
          return response.json();
        }).then((forecast) => ({
          placeName: getPlaceName(place),
          current: forecast.current,
        }));
      })
      .then((result) => {
        setWeather(result);
      })
      .catch((requestError) => {
        setError(requestError.message || 'Something went wrong. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  // searchNumber changes when Search is clicked, so the same city can be searched again.
  }, [searchedCity, searchNumber]);

  // Stop the form from refreshing the page and search using the trimmed city name.
  function handleSearch(event) {
    event.preventDefault();
    const city = cityInput.trim();

    if (!city) {
      setWeather(null);
      setError('Please enter a city name.');
      return;
    }

    setError('');
    setSearchedCity(city);
    setSearchNumber((number) => number + 1);
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <h1>Weather Dashboard</h1>
        <p>Check the current weather in your city</p>
      </header>

      {/* Pass the search value and event handlers to the SearchBar component. */}
      <SearchBar
        value={cityInput}
        onChange={setCityInput}
        onSearch={handleSearch}
        loading={loading}
      />

      {/* Show a message based on whether the app is loading, has an error, or has weather data. */}
      <div className="status-area" aria-live="polite">
        {loading && <LoadingMessage />}
        {!loading && error && <ErrorMessage message={error} />}
        {!loading && !error && weather && <p className="success-message">Weather loaded successfully.</p>}
        {!loading && !error && !weather && <p className="hint-message">Enter a city name to see its weather.</p>}
      </div>

      {/* Show the weather card after a successful search. */}
      {!loading && !error && weather && <WeatherCard weather={weather} />}
    </main>
  );
}
