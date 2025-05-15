/* 
  File: /routes/dashboardRoutes.js
  Purpose: routes for user dashboard page
  Notes:
  - Mounted at /dashboard in app.js
  - GET /dashboard --> renders dashboard page
*/

const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/dashboardController');

// Since router is mounted at '/dashboard', use '/' here to handle GET /dashboard
router.get('/', ensureAuth, dashboardController.getDashboard);

module.exports = router;
