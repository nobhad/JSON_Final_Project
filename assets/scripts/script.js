/* 
  File: /assets/scripts/script.js
  Project: Noelle_Bhaduri_JSON_Final_Project
  Author: Noelle Bhaduri
  Last Updated: 05/16/2025

*/

/* nav toggle */
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    navToggle.setAttribute(
      "aria-expanded",
      navMenu.classList.contains("active")
    );
  });
});


/* contact form */
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
  
/* footer */
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});