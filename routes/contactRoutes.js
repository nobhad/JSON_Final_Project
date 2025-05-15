// File: /routes/contactRoutes.js
// Purpose: Routes for contact page with form and WYSIWYG editor; submit appointment requests to MongoDB

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.showContactForm);
router.post('/', contactController.submitContactForm);

module.exports = router;
