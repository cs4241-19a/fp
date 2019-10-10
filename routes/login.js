var express = require('express');
var router = express.Router();
var passport = require('passport');
var app = require('../app');

router.post('/',
    passport.authenticate('local', {failureRedirect: '/'}),
    function(req,res){
        app.user = req.user;
        res.end();
    });
router.get('/profile', function(req, res) {
    res.render('profile',{user: app.user.username})
})    

module.exports = router;
