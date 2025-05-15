// File: /routes/bookingRoutes.js  
// Purpose: Defines routes for displaying and handling service booking form

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/book', bookingController.showBookingForm);
router.post('/book', bookingController.submitBooking);

module.exports = router;
