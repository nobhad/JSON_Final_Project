// File: /controllers/dashboardController.js
// Purpose: Controller for handling user dashboard page

const Testimonial = require('../models/Testimonial');
const Booking = require('../models/Booking');

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.session.user.id;

    // Fetch testimonials for this user, sorted newest first
    const testimonials = await Testimonial.find({ user: userId }).sort({ createdAt: -1 });

    // Fetch bookings for this user, sorted by preferredDate or createdAt descending
    const bookings = await Booking.find({ customerEmail: req.session.user.email }).sort({ preferredDate: -1 });

    // Render dashboard view with both datasets
    res.render('pages/dashboard', { testimonials, bookings });
  } catch (err) {
    console.error('Dashboard load error:', err);
    res.render('pages/dashboard', { testimonials: [], bookings: [], error: 'Failed to load dashboard' });
  }
};

