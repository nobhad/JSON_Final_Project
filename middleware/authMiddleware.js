// File: /middleware/authMiddleware.js
// Purpose: Middleware to protect routes that require user authentication

exports.ensureAuth = (req, res, next) => {
    if (req.session.userId) {
      next();
    } else {
      res.redirect('/login');
    }
  };
  