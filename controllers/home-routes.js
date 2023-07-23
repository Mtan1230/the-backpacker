const router = require('express').Router();
const { Traveller, Post, Comment } = require('../models');
const { withAuth, isGuest } = require('../utils/auth');

// @desc    homepage
// @route   GET /
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

// @desc    Signup page
// @route   /signup
router.get('/signup', isGuest, (req, res) => {
  res.render('signup');
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn || req.isAuthenticated()) {
    res.redirect('/');
  }
  res.render('login');
});

router.get('/logout', async (req, res, next) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;