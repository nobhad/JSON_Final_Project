/* 
  File: /assets/js/weather.js
  Project: Noelle_Bhaduri_JSON_Final_Project
  Author: Noelle Bhaduri
  Last Updated: 05/16/2025

  Purpose:
    - Fetches and displays current weather data for Boston, MA
    - Uses OpenWeatherMap API (Module 9 example)
    - Injects weather icon, condition, and temperature into the homepage

  Requirements:
    - jQuery 3.3.1 or later
    - Internet connection to fetch live API data

  Notes:
    - Weather data is displayed in the #weather-widget container
    - API key should be kept secure in production environments
*/


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          message: document.getElementById("message").value,
        };
        localStorage.setItem("contactData", JSON.stringify(data));
        alert("Message saved!");
        form.reset();
      });
    }
  
    fetch("external.json")
      .then((res) => res.json())
      .then((data) => {
        const hof = document.getElementById("hall-of-fame-content");
        const test = document.getElementById("testimonials-content");
        if (hof) hof.innerHTML = data.hallOfFame.map(item => `<p>${item}</p>`).join("");
        if (test) test.innerHTML = data.testimonials.map(item => `<p>${item}</p>`).join("");
      });
  });
  