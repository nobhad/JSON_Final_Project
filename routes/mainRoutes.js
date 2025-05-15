// File: /routes/mainRoutes.js
// Purpose: Handles general site pages like home, about, and portfolio

const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('index', {
    user: req.session.user || null,
    title: 'Home'
  });
});

// About page
router.get('/about', (req, res) => {
  res.render('pages/about', {
    user: req.session.user || null,
    title: 'About'
  });
});

// Add more static or general pages here...

module.exports = router;
