// File: /controllers/authController.js
// Purpose: Handles registration, login, logout functionality

const User = require('../models/User');

exports.showRegister = (req, res) => {
  res.render('auth/register');
};

exports.register = async (req, res) => {
    try {
      const { firstName, lastName, email, password, confirmPassword } = req.body;
  
      if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match.");
      }
  
      const user = new User({ firstName, lastName, email, password });
      await user.save();
      req.session.userId = user._id;
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(400).send('Registration error. Maybe email is already taken.');
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
