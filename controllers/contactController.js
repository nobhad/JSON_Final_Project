// File: /controllers/contactController.js
// Purpose: To handle the contact form submission and display the contact form
// Notes:
// - Uses ContactRequest model
// - Stores and retrieves flash messages for success and error
// - Adds server-side validation to check for valid inputs and prevent scripts

const ContactRequest = require('../models/ContactRequest');

exports.showContactForm = (req, res) => {
  res.render('pages/contact', {
    user: req.session.user,
    flash: req.flash(), 
  });
};

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const errors = [];

    // Reject < or > characters to help prevent scripts
    const disallowedPattern = /[<>]/;

    if (!name || disallowedPattern.test(name.trim())) {
      errors.push('Please enter a valid name without < or > characters.');
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.push('Please enter a valid email address.');
    }

    if (!message || disallowedPattern.test(message.trim())) {
      errors.push('Please enter a valid message without < or > characters.');
    }

    // If errors, set flash error messages and redirect back to form
    if (errors.length > 0) {
      errors.forEach(err => req.flash('error', err));
      return res.redirect('/contact');
    }

    // Save valid contact request
    const contactRequest = new ContactRequest({ name, email, message });
    await contactRequest.save();

    req.flash('success', 'Message sent successfully!');
    res.redirect('/contact');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error sending message. Please try again.');
    res.redirect('/contact');
  }
};
