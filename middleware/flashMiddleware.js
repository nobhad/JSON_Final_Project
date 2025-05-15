// File: /middleware/flashMiddleware.js
// Purpose: Provide simple flash message support using session

exports.flash = (req, res, next) => {
    if (!req.session) {
      return next(new Error('Session not found'));
    }
  
    // expose flash messages to views
    res.locals.flash = req.session.flash;
    // clear flash messages so they don't persist
    delete req.session.flash;
  
    // helper function to set flash messages easily
    req.flash = (type, message) => {
      req.session.flash = { type, message };
    };
  
    next();
  };
  