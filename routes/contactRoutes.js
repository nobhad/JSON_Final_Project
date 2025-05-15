// File: /routes/contactRoutes.js
// Purpose: Defines routes for contact page with query submission

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('contact', { user: req.session.user });
});

router.post('/', (req, res) => {
  // Example: handle contact form submission
  const { name, email, message } = req.body;

  // TODO: Add logic to save the message, send email, or whatever is needed

  req.flash('success', 'Your message has been sent. Thank you!');
  res.redirect('/contact');
});

module.exports = router;
