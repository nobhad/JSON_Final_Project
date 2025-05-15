/*
  File: /middleware/authMiddleware.js
  Purpose: Middleware to protect routes that require login
  Notes:
  - Redirect unauthorized users to login page with flash message
  - Prevent route handler execution if not authenticated
*/

function ensureAuth(req, res, next) {
  // check if session.userId exists for auth
  if (req.session && req.session.userId) {
    return next();
  } else {
    req.flash('error', 'You must be logged in to view this page');
    return res.redirect('/auth/login');
  }
}

module.exports = { ensureAuth };
