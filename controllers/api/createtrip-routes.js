
const router = require('express').Router();
const Amadeus = require('amadeus');

// Search Which cities or airports start with the parameter variable using Amadeus
router.get(`/city-and-airport-search/:parameter`, (req, res) => {
  const parameter = req.params.parameter;
  const amadeus = new Amadeus({
    clientId: 'f7FtPkofIucCEZGd1j1nQ2d2HlKHS3rG',
    clientSecret: 'jeAA44fFVLSyGIsX',
    Url: "https://test.api.amadeus.com/v2"
  });

  amadeus.referenceData.locations
    .get({
      keyword: parameter,
      subType: Amadeus.location.any,
    })
    .then(function (response) {
      res.send(response.result);
    })
    .catch(function (response) {
      res.send(response);
    });
});

// CREATE a trip by searching cheapest flights using Amadeus
router.post('/search', async (req, res) => {

  const amadeus = new Amadeus({
    clientId: 'f7FtPkofIucCEZGd1j1nQ2d2HlKHS3rG',
    clientSecret: 'jeAA44fFVLSyGIsX',
    Url: "https://test.api.amadeus.com/v2"
  });
  // Confirm availability and price from NYC to SYD in summer 2023
  let leavingFrom = 'NYC';
  let destination = 'LON';
  let departure = '2023-08-01';
  let number_traveller = '1';

  amadeus.shopping.flightOffersSearch.get({
    originLocationCode: leavingFrom,
    destinationLocationCode: destination,
    departureDate: departure,
    adults: number_traveller
  }).then(function (flightOffersSearchResponse) {
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
    })
    .catch(error => {
      console.error(error);
    });

  res.status(200).json();
});

module.exports = router;