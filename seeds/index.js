const sequelize = require('../config/connection');
const seedTraveller = require('./travellerData');
const seedPost = require('./postData');
const seedLocation = require('./locationData')

const seedAll = async () => {

  await sequelize.sync({ force: true });

  await seedTraveller();

  await seedPost();

  await seedLocation();

  process.exit(0);
  
};

seedAll();
