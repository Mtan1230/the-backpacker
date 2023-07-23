const router = require('express').Router();
const { Traveller } = require('../../models');

// @desc    Signup
// @route   /api/travellers/signup
router.post('/signup', async (req, res) => {
  try {
    const travellerData = await Traveller.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = travellerData.dataValues.id;

      res
        .status(200)
        .json({ traveller: travellerData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const travellerData = await Traveller.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!travellerData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    const validPassword = await travellerData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = travellerData.dataValues.id;

      res
        .status(200)
        .json({ traveller: travellerData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout
router.post('/logout', async (req, res, next) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
