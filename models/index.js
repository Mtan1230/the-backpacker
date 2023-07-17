const Traveller = require('./Traveller');
const Post = require('./Post');
const Location = require('./Location');
const Trip = require('./Trip');

Traveller.hasMany(Post, {
  foreignKey: 'traveller_id',
});

Post.belongsTo(Traveller, {
  foreignKey: 'traveller_id',
});

Traveller.belongsToMany(Location, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Trip,
    unique: false
  },
  // Define an alias for when data is retrieved
  foreignKey: 'traveller_id',
  as: 'planned_trips'
});

Location.belongsToMany(Traveller, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Trip,
    unique: false
  },
  // Define an alias for when data is retrieved
  foreignKey: 'location_id',
  as: 'location_travellers'
});

module.exports = { Traveller, Post, Location, Trip };
