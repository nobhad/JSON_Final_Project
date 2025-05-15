/*
  File: /routes/authRoutes.js
  Purpose: Auth routes (register, login, logout)
  Notes:
  - Uses email as username (unique login)
  - Shows login and register forms, processes authentication
  - Redirects after register/login to dashboard
  - Logout destroys session and redirects to login
*/

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/register', authController.showRegister);
router.post('/register', authController.register);

router.get('/login', authController.showLogin);
router.post('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;
