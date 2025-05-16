// File: /routes/contactRoutes.js
// Purpose: Defines routes for contact page with query submission
// Notes:
// - Delegates GET/POST to contactController to preserve flash/message functionality

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.showContactForm);
router.post('/', contactController.submitContactForm);

module.exports = router;
