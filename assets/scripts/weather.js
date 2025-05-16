/* 
  File: /assets/js/weather.js
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

$(document).ready(function () {
  $.getJSON(
    "https://api.openweathermap.org/data/2.5/weather?q=Boston&units=imperial&appid=f5b2a7bd667d2398b3f286f4d2162e41",
    function (data) {
      console.log(data);

      var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      var temp = data.main.temp;
      var weather = data.weather[0].main;

      $(".icon").attr("src", icon);
      $(".weather").text(weather);
      $(".temp").text(temp + "°F");
    }
  );
});
