// File: /middleware/sessionMiddleware.js
// Purpose: Make session info available in all views via res.locals

exports.attachSessionToViews = (req, res, next) => {
    res.locals.session = req.session;
    // Make user available as 'user' directly for convenience
    res.locals.user = req.session.user || null;
    next();
  };
  