const express = require('express');
const router = express.Router();

const { Post } = require('./models/models');

/**
 * query all posts ordered by created date
 */
router.get('/index.html', async function (req, res) {
  // query all the post ordered by created date
  let __postInfos = await Post.find({}, { content: 0 })
    .populate('publisher')
    .sort({ createdDate: -1 });
  // query the top 5 post according to the comment
  let __top5CommentPost = await Post.find({}, { content: 0 })
                                  .sort({ comment: -1, createdDate: -1 })
                                  .limit(5);
  res.render('index', {
    title: 'solstice',
    isLogin: req.session.isLogin,
    username: req.session.username,
    email: req.session.email,
    userId: req.session.userId,
    postInfos: __postInfos,
    top5CommentPosts: __top5CommentPost
  });
});

module.exports = router;
