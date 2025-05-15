// File: /routes/testimonialRoutes.js
// Purpose: Routes to view and submit testimonials

const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const upload = require('../middleware/upload'); // Multer for image uploads

// Middleware to restrict access
function ensureLoggedIn(req, res, next) {
  if (req.session.userId) return next();
  res.redirect('/login');
}

// GET: New testimonial form
router.get('/testimonials/new', ensureLoggedIn, testimonialController.newForm);

// POST: Submit testimonial with image upload
router.post(
  '/testimonials',
  ensureLoggedIn,
  upload.single('image'), // handle single image file
  testimonialController.createTestimonial
);

module.exports = router;
