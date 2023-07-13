const { Post } = require('../models');

const postData = [
  {
    title: 'What is MVC?',
    text: 'MVC, short for Model, View, and Controller, is a methodology or architectural pattern used for efficiently relating the user interface to underlying data models and organizing to relate the application code. MVC is primarily used to separate an application into three main components: Model, View, and Controller.',
    user_id: 1
  },
  {
    title: 'What is object-oriented programming?',
    text: 'Object-oriented programming (OOP) is a computer programming model that organizes software design around data, or objects, rather than functions and logic. An object can be defined as a data field that has unique attributes and behavior.',
    user_id: 1
  }
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
