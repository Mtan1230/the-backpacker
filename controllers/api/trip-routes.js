const router = require('express').Router();
const { Location, Traveller, Trip } = require('../../models');

// CREATE a trip
router.post('/', async (req, res) => {
  try {
    let locationName = document.getElementById('destination').value;
   
    const location_id = await Location.findAll({
      // JOIN with travellers, using the Trip 1 Location through table
      include: [{ model: Traveller, through: Trip, as: 'location_travellers' }]
    });
    // Create a new trip with random `trip_budget` and `number of travellers` values,
    const tripData = await Trip.create(
      {
        trip_budget: (Math.random() * 10000 + 1000).toFixed(2),
        number_traveller: Math.floor(Math.random() * 10) + 1,
        traveller_id: req.session.userId,
        location_id
      }
    );
    res.status(200).json(tripData);
  } catch (err) {
    res.status(400).json(err);
  }
  
});


module.exports = router;
