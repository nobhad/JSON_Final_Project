// File: /controllers/bookingController.js
// Purpose: Handle GET and POST requests for service bookings (stores data in MongoDB)

const Booking = require('../models/Booking');

// Show booking form
exports.showBookingForm = (req, res) => {
    const isAuthenticated = req.session && req.session.user;
  
    if (!isAuthenticated) {
      if (req.flash && typeof req.flash === 'function') {
        req.flash('error', 'You must be logged in to book a service.');
      } else if (req.session) {
        req.session.flash = { type: 'error', message: 'You must be logged in to book a service.' };
      }
    }
  
    let flashError;
  
    if (req.flash && typeof req.flash === 'function') {
      flashError = req.flash('error');
    } else if (req.session?.flash?.type === 'error') {
      flashError = [req.session.flash.message];
      delete req.session.flash;
    }
  
    // fallback to empty array if still undefined
    if (!Array.isArray(flashError)) {
      flashError = [];
    }
  
    res.render('booking/book', {
      errorMessage: flashError.length > 0 ? flashError[0] : null,
      showForm: isAuthenticated
    });
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

    res.redirect('/booking/thankyou');
  } catch (err) {
    console.error('Error submitting booking:', err);
    res.status(500).send('Something went wrong. Please try again.');
  }
};
