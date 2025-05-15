// File: /routes/bookingRoutes.js  
// Purpose: Defines routes for displaying and handling service booking form

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { ensureAuth } = require('../middleware/authMiddleware');

router.get('/', ensureAuth, bookingController.showBookingForm);
router.post('/', ensureAuth, bookingController.submitBooking);

module.exports = router;
