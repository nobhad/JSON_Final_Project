// File: /index.js
// Purpose: Main app entry point; sets up Express, session, middleware, connects routes and starts server

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKeyHere',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
const authRoutes = require('./routes/authRoutes');
const mainRoutes = require('./routes/mainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use('/', authRoutes);
app.use('/', mainRoutes);
app.use('/', bookingRoutes);
app.use('/', portfolioRoutes);
app.use('/', testimonialRoutes);
app.use('/', contactRoutes);


const sessionMiddleware = require('./middleware/sessionMiddleware');

app.use(sessionMiddleware.attachSessionToViews);

const flashMiddleware = require('./middleware/flashMiddleware');

app.use(flashMiddleware.flash);

const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/', dashboardRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`No Bhad Dogs app running at http://localhost:${PORT}`);
});
