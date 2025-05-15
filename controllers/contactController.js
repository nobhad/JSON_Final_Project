// File: /controllers/contactController.js
// Purpose: Handle appointment request form submission and display contact page with WYSIWYG editor

const Appointment = require('../models/Appointment');

exports.showContactForm = (req, res) => {
  res.render('contact', { user: req.session.userId });
};

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, service, message } = req.body;

    const appointment = new Appointment({
      name,
      email,
      service,
      message
    });

    await appointment.save();

    res.render('contact', { success: 'Appointment request sent successfully!', user: req.session.userId });
  } catch (err) {
    res.render('contact', { error: 'Error sending request.', user: req.session.userId });
  }
};
