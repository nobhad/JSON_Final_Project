// File: /routes/mainRoutes.js
// Purpose: Handles general site pages like home, about, and portfolio
// Notes:
// - These routes render public/general pages
// - Do NOT pass isDashboard flag here (or pass false if desired)

const express = require('express');
const router = express.Router();
const hallOfFameController = require('../controllers/hallOfFameController');

// Home page
router.get('/', (req, res) => {
  res.render('index', {
    user: req.session.user || null,
    title: 'Home'
    // isDashboard not passed or false by default
  });
});

// About page
router.get('/about', (req, res) => {
  res.render('pages/about', {
    user: req.session.user || null,
    title: 'About'
  });
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('pages/contact', {
    user: req.session.user || null,
    messages: req.session.messages || {},
    title: 'Contact'
  });
});

// Hall of Fame page
router.get('/halloffame', hallOfFameController.showHallOfFame);

// Add more static or general pages here...

module.exports = router;
