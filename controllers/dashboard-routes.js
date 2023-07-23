const router = require('express').Router();
const { Post } = require('../models');
const { withAuth } = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({ where: { traveller_id: req.session.userId || req.user.id } });

    if (postData.length) {
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: req.session.loggedIn || req.isAuthenticated() });
    } else {
      res.render('dashboard', { loggedIn: req.session.loggedIn || req.isAuthenticated() });

    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/create', withAuth, async (req, res) => {
  try {
    res.render('dashboard-create', { loggedIn: req.session.loggedIn || req.isAuthenticated() });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

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
