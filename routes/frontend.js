/**
 * this file is used to load all the frontend routers
 */
const express = require('express');
const router = express.Router();

const indexRouter = require('./index');
const postRouter = require('./post');
const commentRouter = require('./comment');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const registerRouter = require('./register');

router.use('/', indexRouter);
router.use('/', loginRouter);
router.use('/', logoutRouter);
router.use('/', registerRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);

module.exports=router;