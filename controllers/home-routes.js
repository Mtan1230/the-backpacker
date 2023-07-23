const router = require('express').Router();
const { Traveller, Post, Comment } = require('../models');
const { isGuest } = require('../utils/auth');

// @desc    homepage
// @route   /
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: Traveller,
          attributes: ['username', 'image'],
        },
      ],
    });
    const posts = postData.map((post) =>
      post.get({ plain: true })
    );

    if (req.session.loggedIn || req.isAuthenticated()) {
      const travellerData = await Traveller.findByPk(req.session.userId || req.user.id);
      const traveller = travellerData.get({ plain: true });

      res.render('homepage', {
        posts, traveller, loggedIn: req.session.loggedIn || req.isAuthenticated(),
      });
    } else {
      res.render('homepage', {
        posts, loggedIn: req.session.loggedIn || req.isAuthenticated(),
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// @desc    Single post page
// @route   /post/:id
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Traveller,
          attributes: ['username', 'image'],
        },
        {
          model: Comment,
          include: [
            {
              model: Traveller,
              attributes: ['username', 'image'],
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

// @desc    Signup page
// @route   /signup
router.get('/signup', isGuest, (req, res) => {
  res.render('signup');
});

// @desc    Login page
// @route   /login
router.get('/login', isGuest, (req, res) => {
  res.render('login');
});

module.exports = router;