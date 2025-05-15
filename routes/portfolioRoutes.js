// File: /routes/portfolioRoutes.js
// Purpose: Routes to display favorite dogs portfolio page

const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

router.get('/', portfolioController.showPortfolio);

module.exports = router;
