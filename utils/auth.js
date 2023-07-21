const withAuth = (req, res, next) => {
  if (req.session.loggedIn || req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = withAuth;
