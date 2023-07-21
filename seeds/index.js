const { Location, Trip } = require('../models');

const sequelize = require('../config/connection');
const seedPost = require('./postData');
const seedTraveller = require('./travellerData');
const seedComment = require('./commentData');
const locationSeedData = require('./locationSeedData.json');

const seedDatabase = async () => {

  await sequelize.sync({ force: true });

  await seedTraveller();

  await seedPost();

  await seedComment();

  const locations = await Location.bulkCreate(locationSeedData);

  // Create trips at random
  for (let i = 0; i < 10; i++) {

    // Get a random location's `id`
    const { id: randomLocationId } = locations[
      Math.floor(Math.random() * locations.length)
    ];
    // Create a new trip with random `trip_budget` and `number of travellers` values, but with ids selected above
    await Trip.create({
      trip_budget: (Math.random() * 10000 + 1000).toFixed(2),
      number_traveller: Math.floor(Math.random() * 10) - 1,
      traveller_id: 1,
      location_id: randomLocationId
    }).catch((err) => {
      console.log(err);
    });
  }
  process.exit(0);
};
seedDatabase();
