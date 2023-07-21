const router = require('express').Router();
const Amadeus = require('amadeus');


// CREATE a trip by searching cheapest flights using Amadeus
router.post('/search', async (req, res) => {

  const amadeus = new Amadeus({
    clientId: 'f7FtPkofIucCEZGd1j1nQ2d2HlKHS3rG',
    clientSecret: 'jeAA44fFVLSyGIsX',
    Url: "https://test.api.amadeus.com/v2"
  });

  const amadeusleavinglocations = await amadeus.referenceData.locations
    .get({
      keyword: req.body.leavingFrom,
      subType: Amadeus.location.any,
    })
  const amadeusdestinationlocations = await amadeus.referenceData.locations
    .get({
      keyword: req.body.destination,
      subType: Amadeus.location.any,
    })
  const amadeus_leavinglocation_one = amadeusleavinglocations.data[0]
  const amadeus_destinationlocation_one = amadeusdestinationlocations.data[0]

  // Confirm availability and price from NYC to SYD in summer 2023
  let leavingFrom = amadeus_leavinglocation_one.iataCode;
  let destination = amadeus_destinationlocation_one.iataCode;
  let departure = req.body.departure;
  let number_traveller = Math.floor(Math.random() * 5) + 1;

  amadeus.shopping.flightOffersSearch.get({
    originLocationCode: leavingFrom,
    destinationLocationCode: destination,
    departureDate: departure,
    adults: number_traveller
  })
    .then(function (flightOffersSearchResponse) {
      return amadeus.shopping.flightOffers.pricing.post(
        JSON.stringify({
          'data': {
            'type': 'flight-offers-pricing',
            'flightOffers': [flightOffersSearchResponse.data[0]]
          }
        })
      )
    })
    .then(function (data) {
      console.log(JSON.stringify(data));
      res.status(200).json(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error, message: "Amadeus failed to get the flight offers search" });
    });
    
});

module.exports = router;
