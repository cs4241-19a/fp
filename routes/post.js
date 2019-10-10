const express = require('express');
const router = express.Router();

const { Post, Comment } = require('./models/models');

/**
 * query post detail information according to the post id
 */
router.get('/query.html', async function (req, res) {
    let __id = req.query.id;
    // query post according to the given id
    let __queryInfo = await Post.findById({
        _id: __id
    }).populate('publisher');
    // query all the comments of the post
    let __comments = await Comment.find({ post: __id }).populate('commenter').sort({ createdDate: 1 })
    res.render('postDetail', {
        title: 'Post Detail Page',
        isLogin: req.session.isLogin,
        username: req.session.username,
        email: req.session.email,
        userId: req.session.userId,
        postInfo: __queryInfo,
        comments: __comments
    });
});

module.exports = router;