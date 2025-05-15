// File: /models/Testimonial.js
// Purpose: Testimonial schema to store user testimonials with reference to User

const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
