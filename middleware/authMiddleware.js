/*
  File: /middleware/authMiddleware.js
  Purpose: Middleware to protect routes that require login
  Notes:
  - Redirect unauthorized users to login page with flash message
  - Prevent route handler execution if not authenticated
*/

function ensureAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    req.flash('error', 'Please log in to book a service');
    return res.redirect('/auth/login');  // redirect instead of next()
  }
}

module.exports = { ensureAuth };
