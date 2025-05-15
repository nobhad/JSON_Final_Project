// File: /routes/bookingRoutes.js
// Purpose: Defines routes for displaying and handling service booking form

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { ensureAuth } = require('../middleware/authMiddleware');

// Show form with auth check, error shown via flash
router.get('/book', ensureAuth, bookingController.showBookingForm);

// Submission requires login
router.post('/book', ensureAuth, bookingController.submitBooking);

// Thank you page
router.get('/thankyou', (req, res) => {
  res.render('booking/thankyou');
});

module.exports = router;
