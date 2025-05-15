// File: /routes/testimonialRoutes.js
// Purpose: Routes to view and submit testimonials

const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

// Middleware to restrict access
function ensureLoggedIn(req, res, next) {
  if (req.session.userId) return next();
  res.redirect('/login');
}

// GET: New testimonial form
router.get('/testimonials/new', ensureLoggedIn, testimonialController.newForm);

// POST: Submit testimonial
router.post('/testimonials', ensureLoggedIn, testimonialController.createTestimonial);

module.exports = router;
