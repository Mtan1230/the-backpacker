const { Traveller } = require('../models');

const travellerData = {
  username: 'JDoe',
  email: 'j.doe@gmail.com',
  password: '123456'
};

const seedTraveller = () => Traveller.create(travellerData);
module.exports = seedTraveller;
