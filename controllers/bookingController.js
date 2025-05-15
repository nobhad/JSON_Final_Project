// File: /controllers/bookingController.js
// Purpose: Handle GET and POST requests for service bookings (stores data in MongoDB)

const Booking = require('../models/Booking');

// Show booking form
exports.showBookingForm = (req, res) => {
  res.render('booking/book');
};

// Handle booking form submission
exports.submitBooking = async (req, res) => {
  try {
    const { customerName, customerEmail, serviceType, preferredDate, notes } = req.body;

    const newBooking = new Booking({
      customerName,
      customerEmail,
      serviceType,
      preferredDate,
      notes
    });

    await newBooking.save();
    res.redirect('pages/thankyou');
  } catch (err) {
    console.error('Error submitting booking:', err);
    res.status(500).send('Something went wrong. Please try again.');
  }
};
