// File: /routes/authRoutes.js
// Purpose: Handles user registration, login, logout

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Registration page
router.get('/register', UserController.showRegister);
router.post('/register', UserController.registerUser);

// Login page
router.get('/login', UserController.showLogin);
router.post('/login', UserController.loginUser);

// Logout
router.get('/logout', UserController.logoutUser);

module.exports = router;
