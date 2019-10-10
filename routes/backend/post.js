const express = require('express');
const router = express.Router();

const { Post, User, Comment } = require('../models/models');
const config = require('../config/config');

/**
 * query post information according to its id
 */
router.get('/query.html', async function(req, res) {
    let __id = req.query.id;
    let __postInfo = await Post.findById({
        _id: __id
    });
    res.render('backend/postInfo', {
        title: 'Post Detail Page',
        isLogin: req.session.isLogin,
        username: req.session.username,
        email: req.session.email,
        userId: req.session.userId,
        postInfo: __postInfo
    });
});

/**
 * redirect to the list page of all the posts
 */
router.get('/list.html', async function (req, res) {
    // obtain the pagination information
    let __offset = req.query.offset;
    let __size = req.query.size;
    if (!__offset) {
        __offset = config.pageInfo.offset;
    }
    if(!__size) {
        __size = config.pageInfo.size;
    }

    // query all the post published by the current user
    let __posts = await Post.find({
        publisher: req.session.userId
    },{
        content: 0
    }).sort({"createdDate": 1});//.skip(offset).limit(size);
    res.render('backend/postList', {
        title: 'Post Lists Page',
        isLogin: req.session.isLogin,
        username: req.session.username,
        email: req.session.email,
        postInfos: __posts
    });
});

/**
 * redirect to the page of publishing post
 */
router.get('/publish.html', function (req, res) {
    res.render('backend/postPublish', {
        title: 'Post Publish Page',
        isLogin: req.session.isLogin,
        username: req.session.username,
        email: req.session.email,
        userId: req.session.userId
    })
});

/**
 * save publishing post content
 */
router.post('/save.json', async function (req, res) {
    let __postInfo = req.body;
    __postInfo.publisher = req.session.userId;
    console.log('submit content: ', __postInfo);
    // save post content
    let __rs = await Post.insertMany([__postInfo]);
    if (__rs.length > 0) {
        res.json({
            code: 200,
            msg: 'ok'
        });
    } else {
        res.json({
            code: 500,
            msg: 'save failed!'
        })
    }
});

/**
 * update post
 */
router.post('/update.json', async function(req, res) {
    let __updatedPostInfo = req.body;
    console.log('updated post info', __updatedPostInfo);
    let __rs = await Post.findByIdAndUpdate({
        _id: __updatedPostInfo.id
    }, {
        title: __updatedPostInfo.title,
        content: __updatedPostInfo.content
    });

    if (__rs) {
        res.json({
            code: 200,
            msg: 'Post update successfully!'
        });
    } else {
        res.json({
            code: 500,
            msg: 'Update failed!'
        });
    }
});

/**
 * delete post
 * firstly, delete all the comment corresponding to the post
 * then, delete the post
 */
router.get('/delete.html', async function(req, res) {
    let __id = req.query.id;
    // delete comment of the post
    await Comment.findOneAndDelete({
        post: __id
    });
    await Post.findByIdAndDelete({
        _id: __id
    });
    res.redirect('/forum/backend/post/list.html');
});

module.exports = router;