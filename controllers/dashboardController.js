// File: /controllers/dashboardController.js
// Purpose: Controller for handling user dashboard page

const Booking = require('../models/Booking');
const Testimonial = require('../models/Testimonial');

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.session.userId;

    const bookings = await Booking.find({ user: userId }).lean();
    const testimonials = await Testimonial.find({ user: userId }).lean();

    res.render('pages/dashboard', {
      title: 'Your dashboard',
      bookings,
      testimonials
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
};
