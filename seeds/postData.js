const { Post } = require('../models');

const postData = [
  {
    title: 'How expensive are Cafes and Shops in Paris?',
    text: 'You’ll find that cafes and shops are more expensive the closer they are to the main attractions such as the Eiffel Tower and Triumph Arch. Walk a few blocks from the main areas to find more authentic and less expensive establishments!',
    traveller_id: 1
  },
  {
    title: 'How many days should I stay in Paris?',
    text: 'While three days is better than nothing, I think you need more time than that. Ideally, I think you should plan on spending at least five days in Paris in order to see the bare minimum of what the City of Love has to offer. There’s just too much to do!',
    traveller_id: 1
  }
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
