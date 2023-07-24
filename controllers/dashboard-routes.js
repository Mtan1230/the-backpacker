const router = require('express').Router();
const { Traveller, Post } = require('../models');
const { withAuth } = require('../utils/auth');

// @desc    Dashboard
// @route   /dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    const travellerData = await Traveller.findByPk(req.session.userId || req.user.id);
    const traveller = travellerData.get({ plain: true });

    const postData = await Post.findAll({
      where: { traveller_id: req.session.userId || req.user.id },
      order: [['createdAt', 'DESC']]
    });

    if (postData.length) {
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('dashboard', { posts, traveller, loggedIn: req.session.loggedIn || req.isAuthenticated() });
    } else {
      res.render('dashboard', { traveller, loggedIn: req.session.loggedIn || req.isAuthenticated() });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// @desc    Dashboard create post page
// @route   /dashboard/create
router.get('/create', withAuth, async (req, res) => {
  res.render('dashboard-create', { loggedIn: req.session.loggedIn || req.isAuthenticated() });
});

// @desc    Dashboard edit post page
// @route   /dashboard/post/:id
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (postData) {
      const post = postData.get({ plain: true });
      res.render('dashboard-edit', { post, loggedIn: req.session.loggedIn || req.isAuthenticated() });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
