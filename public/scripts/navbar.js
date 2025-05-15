// navbar.js - toggle mobile menu

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
  
    toggleButton.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  });
  