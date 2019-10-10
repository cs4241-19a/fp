const express = require('express');
const router = express.Router();

const { Comment, Post } = require('./models/models');


/**
 * save comment content
 */
router.post('/publish.json', async function (req, res) {
    let __comment = req.body;
    __comment.commenter = req.session.userId;
    console.log('comment: ', __comment);
    let __rs = await Comment.insertMany([__comment]);
    // update comment times of the commented post
    await Post.findByIdAndUpdate({
        _id: __comment.post
    }, {
        $inc: { comment: 1 }
    });
    if (__rs.length > 0) {
        res.json({
            code: 200,
            msg: 'Comment publish successfully'
        });
    } else {
        res.json({
            code: 200,
            msg: 'Comment publish faily'
        });
    }
});

module.exports = router;