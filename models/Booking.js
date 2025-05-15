// File: /models/Booking.js  
// Purpose: Mongoose model for storing dog care service bookings

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  serviceType: { type: String, required: true },
  preferredDate: { type: Date, required: true },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
