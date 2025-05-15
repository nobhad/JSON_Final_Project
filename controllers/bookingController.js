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


// Show edit form for a booking
exports.editBookingForm = async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res.status(404).send('Booking not found');
      }
  
      // Optional: check if current user is authorized to edit
      if (booking.customerEmail !== req.session.user.email) {
        return res.status(403).send('Unauthorized');
      }
  
      res.render('booking/edit', { booking });
    } catch (err) {
      console.error('Error loading booking edit form:', err);
      res.status(500).send('Server error');
    }
  };
  
  // Handle update of booking
  exports.updateBooking = async (req, res) => {
    try {
      const { serviceType, preferredDate, notes } = req.body;
  
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res.status(404).send('Booking not found');
      }
  
      if (booking.customerEmail !== req.session.user.email) {
        return res.status(403).send('Unauthorized');
      }
  
      // Update fields
      booking.serviceType = serviceType;
      booking.preferredDate = preferredDate;
      booking.notes = notes;
  
      await booking.save();
      res.redirect('/dashboard');
    } catch (err) {
      console.error('Error updating booking:', err);
      res.status(500).send('Server error');
    }
  };

  // Delete a booking
exports.deleteBooking = async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res.status(404).send('Booking not found');
      }
  
      // Opnly allow deleting your own booking
      if (booking.customerEmail !== req.session.user.email) {
        return res.status(403).send('Unauthorized');
      }
  
      await booking.deleteOne();
      res.redirect('/dashboard');
    } catch (err) {
      console.error('Error deleting booking:', err);
      res.status(500).send('Server error');
    }
  };
  