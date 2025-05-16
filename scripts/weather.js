document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
    const city = "Vancouver";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => {
        document.getElementById("weather-data").textContent =
          `Temperature: ${data.main.temp}°C, ${data.weather[0].description}`;
      })
      .catch(() => {
        document.getElementById("weather-data").textContent = "Unable to load weather.";
      });
  });
  