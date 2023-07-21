const router = require('express').Router();
const { Traveller, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: Traveller,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) =>
      post.get({ plain: true })
    );
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn || req.isAuthenticated(),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Traveller,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [
            {
              model: Traveller,
              attributes: ['username'],
            }
          ]
        }
      ],
    });
    const post = postData.get({ plain: true });
    res.render('post', { post, loggedIn: req.session.loggedIn || req.isAuthenticated() });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn || req.isAuthenticated()) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;