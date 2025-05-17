/* 
  File: /assets/scripts/weather.js
  Project: Noelle_Bhaduri_JSON_Final_Project
  Author: Noelle Bhaduri
  Last Updated: 05/16/2025

  Purpose:
    - Fetches and displays current weather data for Boston, MA
    - Uses OpenWeatherMap API (Module 9 example)
    - Displays weather icon, condition, and temperature in Fahrenheit
    - Injects data into the homepage's #weather-widget section

  Dependencies:
    - jQuery 3.3.1 or later (included in index.html)
    - Internet connection (to fetch live API data)
*/

console.log("weather.js loaded");

const API_KEY = '80a47db31aa3e723446652193ad712ba'; 
const city = 'Boston';
const lat = 42.3584;
const lon = -71.0598;

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`)
  .then(response => response.json())
  .then(data => {
    console.log(data);

    // Update icon and info safely
    const iconEl = document.querySelector('.icon');
    const weatherEl = document.querySelector('.weather');
    const tempEl = document.querySelector('.temp');

    if (iconEl) {
      iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      iconEl.alt = data.weather[0].description;
    }

    if (weatherEl) {
      weatherEl.textContent = data.weather[0].description;
    }

    if (tempEl) {
      tempEl.textContent = `Temp: ${data.main.temp}°F (feels like ${data.main.feels_like}°F)`;
    }

    // Leaflet map setup
    const mapContainer = document.getElementById('weather-map');
    if (mapContainer) {
      const map = L.map('weather-map').setView([lat, lon], 7);

      const baseLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Weather layers
      const layers = {
        Clouds: L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`, { opacity: 0.5 }),
        Precipitation: L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`, { opacity: 0.5 }),
        Pressure: L.tileLayer(`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${API_KEY}`, { opacity: 0.5 }),
        Wind: L.tileLayer(`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`, { opacity: 0.5 }),
        Temperature: L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`, { opacity: 0.5 }),
        Snow: L.tileLayer(`https://tile.openweathermap.org/map/snow/{z}/{x}/{y}.png?appid=${API_KEY}`, { opacity: 0.5 })
      };

      // Add all layers by default
      Object.values(layers).forEach(layer => layer.addTo(map));

      // Add layer control
      L.control.layers(null, layers, { collapsed: false }).addTo(map);

      // Add marker for city
      L.marker([lat, lon])
        .addTo(map)
        .bindPopup(`<b>${city}</b><br>${data.weather[0].description}<br>Temp: ${data.main.temp}°F`)
        .openPopup();
    }
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
    const warningEl = document.getElementById('weather-warning');
    if (warningEl) {
      warningEl.textContent = 'Failed to load weather data.';
    }
  });
