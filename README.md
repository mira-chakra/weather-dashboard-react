# Weather Dashboard

This project is a React version of my Weather Dashboard. You can search for a city to see its current temperature, weather condition, feels-like temperature, humidity, wind speed, and whether it is day or night.

## How to run the project

1. Install Node.js if it isn’t already installed.
2. Open the project folder in a terminal.
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the Vite development server:

   ```bash
   npm run dev
   ```

5. Open the local address shown in the terminal.

## React features used

- I split the page into function components. Each component has its own file in `src/components/`.
- I use `useState` to keep track of the search input, the submitted city, the weather data, and loading or error messages.
- I use `useEffect` to get weather data when the submitted city changes. The search number in its dependency list also lets me search for the same city again.
- The form uses `onSubmit`, and the input uses `onChange`.
- Components share information through props. For example, `App` passes information to `SearchBar` and `WeatherCard`, and `WeatherCard` passes the current conditions to `WeatherDetails`.
- The page shows a loading message, an error, or the weather results depending on what is happening.
- The search and weather state is kept in `App`, which passes the information to the components that need it. The data passes through no more than two component levels.

## Weather data

The app first uses the Open-Meteo Geocoding API to find the coordinates of a city. It then uses the Open-Meteo Forecast API to get the current weather. These APIs do not require an API key.