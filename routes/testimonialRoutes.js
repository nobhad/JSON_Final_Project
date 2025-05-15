/**
 * File: /routes/testimonialRoutes.js
 * Purpose: Routes for managing testimonials.
 * Notes:
 * - Protect routes that require login with `ensureLoggedIn` middleware.
 * - Uses multer middleware `upload.single('image')` to handle file uploads.
 * - POST /testimonials for creating new testimonial.
 * - GET /testimonials for listing all testimonials.
 * - GET /testimonials/edit/:id to show edit form.
 * - POST /testimonials/edit/:id to update testimonial.
 * - POST /testimonials/delete/:id to delete testimonial.
 */

const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const upload = require('../middleware/upload');

// Middleware to check if user is logged in (assumes session management is in place)
function ensureLoggedIn(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect('/auth/login');
  }
}

// Show form to create new testimonial
router.get('/new', ensureLoggedIn, testimonialController.newForm);

// Handle new testimonial submission
router.post('/', ensureLoggedIn, upload.single('image'), testimonialController.createTestimonial);

// Show edit form for a testimonial by ID
router.get('/edit/:id', ensureLoggedIn, testimonialController.showEditForm);

// Handle testimonial update
router.post('/edit/:id', ensureLoggedIn, upload.single('image'), testimonialController.updateTestimonial);

// Handle testimonial delete
router.post('/delete/:id', ensureLoggedIn, testimonialController.deleteTestimonial);

// List all testimonials (public)
router.get('/', async (req, res) => {
  try {
    const Testimonial = require('../models/Testimonial');
    const testimonials = await Testimonial.find().lean();
    res.render('testimonials/list', { testimonials });
  } catch (err) {
    console.error('Error fetching testimonials:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
