// File: /controllers/contactController.js
// Purpose: Handle booking request form submission and display contact page

const Booking = require('../models/Booking');

exports.showContactForm = (req, res) => {
  res.render('contact', { user: req.session.userId });
};

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, service, message } = req.body;

    const booking = new Booking({
      customerName: name,
      customerEmail: email,
      serviceType: service,
      notes: message
    });

    await booking.save();

    res.render('pages/contact', { success: 'Appointment request sent successfully!', user: req.session.userId });
  } catch (err) {
    res.render('pages/contact', { error: 'Error sending request.', user: req.session.userId });
  }
};
