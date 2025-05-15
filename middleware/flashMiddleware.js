/*
  File: /middleware/flashMiddleware.js
  Purpose: Provide simple flash message support using session
  Notes:
  - Exposes flash messages to views from session (only once per request)
  - Allows multiple flash messages by type
  - Clears flash messages from session after exposing
  - Adds req.flash(type, message) helper to set flash messages for next request
*/

exports.flash = (req, res, next) => {
  if (!req.session) {
    return next(new Error('Session not found'));
  }

  // expose flash messages from session to views and then clear from session
  res.locals.flash = req.session.flash || {};
  delete req.session.flash;

  // helper to add a flash message to session for next request
  req.flash = (type, message) => {
    if (!req.session.flash) {
      req.session.flash = {};
    }
    if (!req.session.flash[type]) {
      req.session.flash[type] = [];
    }
    req.session.flash[type].push(message);
  };

  next();
};
