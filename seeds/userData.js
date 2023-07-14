const { User } = require('../models');

const userData = {
  username: 'JDoe',
  email: 'j.doe@gmail.com',
  password: '123456'
};

const seedUser = () => User.create(userData);

module.exports = seedUser;
