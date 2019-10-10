var express = require('express');
var router = express.Router();
var passport = require('passport');
var app = require('../app');

router.post('/',
    passport.authenticate('local', {failureRedirect: '/'}),
    function(req,res){
        app.user = req.user;
        res.render( 'profile' , { user: app.user.username });
    });

router.get('/', function(req, res, next) {
    res.render( 'login' );
    });

module.exports = router;
