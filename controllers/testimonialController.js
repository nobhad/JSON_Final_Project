// File: /controllers/testimonialController.js
// Purpose: Logic for handling testimonial creation and display

const Testimonial = require('../models/Testimonial');

exports.newForm = (req, res) => {
  res.render('testimonials/new');
};

exports.createTestimonial = async (req, res) => {
  try {
    await Testimonial.create({
      title: req.body.title,
      content: req.body.content,
      user: req.session.userId,
    });
    res.redirect('/testimonials');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving testimonial.');
  }
};
