// File: /models/ContactRequest.js
// Purpose: Mongoose model for storing contact requests from users
// Notes: Message field stores raw HTML or plain text

const mongoose = require('mongoose');

const contactRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ContactRequest', contactRequestSchema);
