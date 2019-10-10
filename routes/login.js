var express = require('express');
var router = express.Router();
var passport = require('passport');
var app = require('../app');

    router.post('/',
    passport.authenticate('local', {failureRedirect: '/' }),
    function(req,res){
        app.theUser = req.user;
        res.render('profile', { user: app.theUser.username });
    });

module.exports = router;
