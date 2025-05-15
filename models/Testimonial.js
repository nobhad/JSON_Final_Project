/**
 * File: /models/Testimonial.js
 * Purpose: Mongoose schema/model for testimonial documents.
 * Notes:
 * - Stores testimonial content, optional image filename, and user reference.
 */

const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
