var express = require('express');
var router = express.Router();
var passport = require('passport');
var app = require('../app');

router.post('/',
    passport.authenticate('local', {failureRedirect: '/'}),
    function(req,res){
        console.log("hellll");
        app.theUser = req.user;
        //res.end();
    });
router.get('/profile', function(req, res) {
    res.render('profile',{user: app.theUser.username})
})    

module.exports = router;
