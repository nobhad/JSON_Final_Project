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
      // optionally handle req.file here for uploaded image
    });
    res.redirect('/testimonials');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving testimonial.');
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id).lean();
    if (!testimonial) return res.status(404).send('Testimonial not found');
    if (testimonial.user.toString() !== req.session.userId) return res.status(403).send('Not authorized');

    res.render('testimonials/edit', { testimonial });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).send('Testimonial not found');
    if (testimonial.user.toString() !== req.session.userId) return res.status(403).send('Not authorized');

    testimonial.title = req.body.title || testimonial.title;
    testimonial.content = req.body.content || testimonial.content;
    // optionally update image if you want here

    await testimonial.save();
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.deleteTestimonial = async (req, res) => {
    try {
      await Testimonial.findByIdAndDelete(req.params.id);
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting testimonial.');
    }
  };
  