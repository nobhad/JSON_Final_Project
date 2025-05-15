// dashboardRoutes.js - routes for user dashboard page

const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/dashboardController');

router.get('/dashboard', ensureAuth, dashboardController.getDashboard);

module.exports = router;
