const { Comment } = require('../models');

const commentData = [
  {
    text: 'WoW!',
    traveller_id: 1,
    post_id: 1
  }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;