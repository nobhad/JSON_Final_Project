/*
  File: /controllers/authController.js
  Purpose: Handle user authentication logic (register, login, logout)
  Notes:
  - Registration uses email as the unique username field
  - Validates password confirmation during registration
  - On login, searches user by email only
  - Adds flash messages for feedback
  - Session user stores email as username
*/

const User = require('../models/User');

exports.showRegister = (req, res) => {
  res.render('auth/register');
};

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      req.flash('error', 'Passwords do not match');
      return res.redirect('/auth/register');
    }

    // Check if user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'Email is already registered');
      return res.redirect('/auth/register');
    }

    // Create and save new user with email as username
    const user = new User({ firstName, lastName, email, password });
    await user.save();

    // Store user info in session (excluding password)
    req.session.user = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };

    req.flash('success', 'Registration successful');
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      for (let field in error.errors) {
        req.flash('error', error.errors[field].message);
      }
      return res.redirect('/auth/register');
    }
    req.flash('error', 'An error occurred during registration');
    res.redirect('/auth/register');
  }
};

exports.showLogin = (req, res) => {
  res.render('auth/login');
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email only
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/auth/login');
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/auth/login');
    }

    // Set user session
    req.session.user = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };

    req.flash('success', 'Logged in successfully');
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    req.flash('error', 'An error occurred during login');
    res.redirect('/auth/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      req.flash('error', 'Logout failed');
      return res.redirect('/dashboard');
    }
    res.redirect('/auth/login');
  });
};
