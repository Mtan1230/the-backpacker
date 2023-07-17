const { Location } = require('../models');

const locationData = [
  {
    "location_name": "London"
  },
  {
    "location_name": "Paris"
  },
  {
    "location_name": "Venice Beach"
  },
  {
    "location_name": "Miami"
  },
  {
    "location_name": "Los Angeles"
  }
];
const seedLocation = () => Location.bulkCreate(locationData);

module.exports = seedLocation;
