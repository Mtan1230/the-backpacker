const withAuth = (req, res, next) => {
  if (req.session.loggedIn || req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

const isGuest = (req, res, next) => {
  if (!(req.session.loggedIn || req.isAuthenticated())) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = { withAuth, isGuest };
