// File: /routes/mainRoutes.js
// Purpose: Handles general site pages like home, about, portfolio

const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('index', { user: req.session.user });
});

// About page (optional)
router.get('/about', (req, res) => {
  res.render('about', { user: req.session.user });
});

module.exports = router;
