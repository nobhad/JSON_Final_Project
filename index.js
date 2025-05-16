/*
  File: /index.js
  Purpose: Main app entry point; sets up Express, session, middleware, connects routes, and starts server
  Notes:
  - Loads environment variables from .env
  - Uses express-ejs-layouts for templating
  - Mounts routes with appropriate prefixes
  - Serves static files from /public
  - Uses email as unique login identifier (no username)
*/

require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// --- Connect to MongoDB ---
const connectDB = require('./config/db'); // custom database connection module
connectDB(); // call the function to connect

// --- Session setup ---
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKeyHere', // session secret from .env
  resave: false, // don’t resave if nothing is modified
  saveUninitialized: false, // don’t save empty sessions
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day in milliseconds
}));

// --- Middleware for session + flash messaging ---
const sessionMiddleware = require('./middleware/sessionMiddleware'); // attaches user to views
app.use(sessionMiddleware.attachSessionToViews);

const flashMiddleware = require('./middleware/flashMiddleware'); // flash messages
app.use(flashMiddleware.flash);

// --- Middleware for parsing form data and JSON ---
app.use(express.urlencoded({ extended: true })); // for form submissions
app.use(express.json()); // for JSON data

// --- Set EJS as the view engine and views directory ---
app.set('view engine', 'ejs'); // set template engine
app.set('views', path.join(__dirname, 'views')); // point to /views folder

// --- Use express-ejs-layouts ---
app.use(expressLayouts); // enable layout support
app.set('layout', 'partials/layout'); // default layout file

// --- Serve static files from /public ---
app.use(express.static(path.join(__dirname, 'public')));

// --- Middleware to make user data available in all views ---
// This avoids needing to pass user in each res.render() call manually
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// --- Import and mount routes ---
const authRoutes = require('./routes/authRoutes'); // handles login/register/logout
const mainRoutes = require('./routes/mainRoutes'); // homepage and general routes
const bookingRoutes = require('./routes/bookingRoutes'); // service bookings
const testimonialRoutes = require('./routes/testimonialRoutes'); // user testimonials
const contactRoutes = require('./routes/contactRoutes'); // contact form
const dashboardRoutes = require('./routes/dashboardRoutes'); // user dashboard

app.use('/auth', authRoutes); // mount at /auth
app.use('/', mainRoutes); // base route
app.use('/booking', bookingRoutes); // bookings
app.use('/testimonials', testimonialRoutes); // testimonials
app.use('/contact', contactRoutes); // contact
app.use('/dashboard', dashboardRoutes); // dashboard

// --- Redirect helper routes ---
app.get('/book', (req, res) => res.redirect('/booking/book')); // shortcut for booking page
app.get('/register', (req, res) => res.redirect('/auth/register')); // shortcut for register page

// --- Redirect /logout to /auth/logout ---
app.get('/logout', (req, res) => {
  res.redirect('/auth/logout');
});

// --- Start the server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`No Bhad Dogs app running at http://localhost:${PORT}`);
});
