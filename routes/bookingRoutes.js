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

// Edit bookings requires login
router.get('/edit/:id', ensureAuth, bookingController.editBookingForm);
router.post('/edit/:id', ensureAuth, bookingController.updateBooking);
router.post('/delete/:id', ensureAuth, bookingController.deleteBooking);


// Thank you page
router.get('/thankyou', (req, res) => {
  res.render('booking/thankyou');
});

module.exports = router;
