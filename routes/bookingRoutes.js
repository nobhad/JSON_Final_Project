// File: /routes/bookingRoutes.js
// Purpose: Defines routes for displaying and handling service booking form
// Notes:
// - All booking routes protected by ensureAuth middleware
// - Shows flash error only when redirecting from unauthenticated access

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { ensureAuth } = require('../middleware/authMiddleware');

// Show booking form (auth required)
router.get('/book', ensureAuth, bookingController.showBookingForm);

// Handle booking submission (auth required)
router.post('/book', ensureAuth, bookingController.submitBooking);

// Edit and update booking (auth required)
router.get('/edit/:id', ensureAuth, bookingController.editBookingForm);
router.post('/edit/:id', ensureAuth, bookingController.updateBooking);

// Delete booking (auth required)
router.post('/delete/:id', ensureAuth, bookingController.deleteBooking);

// Thank you page (no auth required)
router.get('/thankyou', (req, res) => {
  res.render('booking/thankyou');
});

module.exports = router;
