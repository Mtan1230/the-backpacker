const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.create(
      {
        title: req.body.title,
        text: req.body.content,
        traveller_id: req.session.userId
      }
    );

    if (postData) {
      res.status(200).json(postData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const commentData = Comment.create({
        text: req.body.message,
        traveller_id: req.session.userId,
        post_id: parseInt(req.params.id)
      });
      res.status(200).json(commentData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const updatedData = Post.update({
        title: req.body.title,
        text: req.body.content
      }, {
        where: {id: req.params.id}
      });
      res.status(200).json(updatedData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedData = Post.destroy({
      where: {id: req.params.id}
    });
    res.status(200).json(deletedData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
