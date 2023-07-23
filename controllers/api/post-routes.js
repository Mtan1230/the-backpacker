const router = require('express').Router();
const { Post, Comment } = require('../../models');
const { withAuth } = require('../../utils/auth');
const upload = require('../../config/cloudinary').upload;

router.post('/', withAuth, upload.single('image'), async (req, res) => {
  try {
    const postData = await Post.create(
      {
        title: req.body.title,
        text: req.body.content,
        traveller_id: req.session.userId || req.user.id,
        image: req.file.path
      }
    );

    if (postData) {
      res.status(200).redirect('/dashboard');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// @desc    Add comment
// @route   POST /api/post/:id
router.post('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const commentData = Comment.create({
        text: req.body.message,
        traveller_id: req.session.userId || req.user.id,
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
        where: { id: req.params.id }
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
      where: { id: req.params.id }
    });
    res.status(200).json(deletedData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
