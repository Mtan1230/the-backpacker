const router = require('express').Router();
const { Location } = require('../../models');

// CREATE a location
router.post('/destination', async (req, res) => {
  let locationName = document.getElementById('destination').value;
  try {
    const locationData = await Location.create(locationName);
    res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
