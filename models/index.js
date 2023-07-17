const User = require('./User');
const Post = require('./Post');
const GoogleUser = require('./GoogleUser');

User.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

// GoogleUser.hasMany(Post, {
//   foreignKey: 'user_id',
// });

// Post.belongsTo(GoogleUser, {
//   foreignKey: 'user_id',
// });

module.exports = { User, Post, GoogleUser };
