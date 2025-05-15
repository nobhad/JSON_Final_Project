// File: /middleware/authMiddleware.js
// Purpose: Middleware to protect routes that require login

function ensureAuth(req, res, next) {
    if (req.session && req.session.user) {
      return next();
    } else {
      req.flash('error', 'Please log in to book a service');
      return next(); 
    }
  }
  
  module.exports = { ensureAuth };
  