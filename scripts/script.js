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
  