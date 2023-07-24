const router = require('express').Router();
const { Trip } = require('../models');
const { withAuth } = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const tripData = await Trip.findAll({ where: { traveller_id: req.session.id } });

    if (tripData.length) {
      const trips = tripData.map((trip) => trip.get({ plain: true }));
      res.render('trip', { trips, loggedIn: req.session.loggedIn });
    } else {
      res.render('trip', { loggedIn: req.session.loggedIn });

    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;