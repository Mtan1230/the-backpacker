const Traveller = require('./Traveller');
const Post = require('./Post');
const Location = require('./Location');
const Trip = require('./Trip');
const Comment = require('./Comment');

Traveller.hasMany(Post, {
  foreignKey: 'traveller_id',
});

Post.belongsTo(Traveller, {
  foreignKey: 'traveller_id',
});

Traveller.hasMany(Comment, {
  foreignKey: 'traveller_id',
});

Comment.belongsTo(Traveller, {
  foreignKey: 'traveller_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
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

module.exports = { Traveller, Post, Location, Trip, Comment };
