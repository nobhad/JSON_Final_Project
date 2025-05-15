// File: /routes/testimonialRoutes.js
// Purpose: Routes to view and submit testimonials

const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const upload = require('../middleware/upload'); // multer middleware

// Import Testimonial model directly for list route
const Testimonial = require('../models/Testimonial');

// Middleware to restrict access
function ensureLoggedIn(req, res, next) {
  if (req.session.userId) return next();
  res.redirect('/auth/login');  // Adjusted to /auth/login if you have auth routes
}

// --- New testimonial form ---
router.get('/new', ensureLoggedIn, testimonialController.newForm);

// --- Submit new testimonial with image upload ---
router.post(
  '/',
  ensureLoggedIn,
  upload.single('image'),
  testimonialController.createTestimonial
);

// --- Edit testimonial form ---
router.get('/edit/:id', ensureLoggedIn, testimonialController.showEditForm);

// --- Submit testimonial update ---
router.post('/edit/:id', ensureLoggedIn, testimonialController.updateTestimonial);

// --- POST route to delete testimonial ---
router.post('/delete/:id', ensureLoggedIn, testimonialController.deleteTestimonial);

// --- LIST all testimonials (public route) ---
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().lean();
    res.render('testimonials/list', { testimonials, user: req.session.user || null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
