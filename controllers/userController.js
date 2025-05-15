const User = require('../models/User');
const bcrypt = require('bcrypt');

// Show registration form
exports.showRegister = (req, res) => {
  res.render('auth/register', { error: null });
};

// Handle user registration
exports.registerUser = async (req, res) => {
  // Destructure all fields including new ones
  const { firstName, lastName, phone, address, email, password, confirmPassword } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !phone || !address || !email || !password || !confirmPassword) {
    return res.render('auth/register', { error: 'All fields are required.' });
  }

  if (password !== confirmPassword) {
    return res.render('auth/register', { error: 'Passwords do not match.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('auth/register', { error: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Save all fields in newUser
    const newUser = new User({
      firstName,
      lastName,
      phone,
      address,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    req.session.user = {
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    };

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('auth/register', { error: 'An error occurred, please try again.' });
  }
};

// Show login form
exports.showLogin = (req, res) => {
  res.render('auth/login', { error: null });
};

// Handle login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render('auth/login', { error: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('auth/login', { error: 'Invalid email or password.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render('auth/login', { error: 'Invalid email or password.' });
    }
    
    req.session.user = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('auth/login', { error: 'An error occurred, please try again.' });
  }
};

// Handle logout
exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
};
