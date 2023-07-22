const router = require('express').Router();
const Amadeus = require('amadeus');
require('dotenv').config();


// CREATE a trip by searching cheapest flights using Amadeus
router.post('/search', async (req, res) => {
  try {
    const amadeus = new Amadeus({
      clientId: process.env.AMADEUS_CLIENT_ID,
      clientSecret: process.env.AMADEUS_CLIENT_SECRET,
      Url: 'https://test.api.amadeus.com/v2'
    });

    const amadeusleavinglocations = await amadeus.referenceData.locations
      .get({
        keyword: req.body.leavingFrom,
        subType: Amadeus.location.any,
      });
    const amadeusdestinationlocations = await amadeus.referenceData.locations
      .get({
        keyword: req.body.destination,
        subType: Amadeus.location.any,
      });
    const amadeus_leavinglocation_one = amadeusleavinglocations.data[0];
    const amadeus_destinationlocation_one = amadeusdestinationlocations.data[0];

    // Confirm availability and price for 1 adult
    let leavingFrom = amadeus_leavinglocation_one.iataCode;
    let destination = amadeus_destinationlocation_one.iataCode;
    let departure = req.body.departure;
    let number_traveller = 1;

    const flightOffersSearchResponse = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: leavingFrom,
      destinationLocationCode: destination,
      departureDate: departure,
      adults: number_traveller
    });

    const data = await amadeus.shopping.flightOffers.pricing.post(
      JSON.stringify({
        'data': {
          'type': 'flight-offers-pricing',
          'flightOffers': [flightOffersSearchResponse.data[0]]
        }
      })
    );

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, message: 'Amadeus failed to get the flight offers search' });
  }
});

module.exports = router;