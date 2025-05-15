// File: /controllers/authController.js
// Purpose: Handles registration, login, logout functionality

const User = require('../models/User');

exports.showRegister = (req, res) => {
  res.render('auth/register');
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    req.session.userId = user._id;
    res.redirect('/');
  } catch (err) {
    res.status(400).send('Registration error. Maybe username/email already taken.');
  }
};

exports.showLogin = (req, res) => {
  res.render('auth/login');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(400).send('Invalid credentials.');
  }
  req.session.userId = user._id;
  res.redirect('/');
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
