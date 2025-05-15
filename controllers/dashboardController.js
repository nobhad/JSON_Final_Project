/* 
  File: /controllers/dashboardController.js
  Purpose: Controller logic for dashboard routes
  Notes:
  - Assumes user is authenticated
  - Fetches bookings and testimonials for the logged-in user
*/

const Booking = require('../models/Booking');
const Testimonial = require('../models/Testimonial');

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.session.user._id; 

    // Fetch user's bookings and testimonials
    const bookings = await Booking.find({ user: userId }).lean();
    const testimonials = await Testimonial.find({ user: userId }).lean();

    res.render('dashboard/dashboard', { bookings, testimonials, title: 'Dashboard' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
