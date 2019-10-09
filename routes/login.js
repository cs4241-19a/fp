var express = require('express');
var router = express.Router();
var passport = require('passport');
var app = require('../app');
const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/userData.json');

const database = low(adapter);

router.post('/',
    passport.authenticate('local', {failureRedirect: '/'}),
    function(req,res){
        console.log("heloooo")
        app.user = req.user;
        res.render( 'profile' , { user: app.user.displayName });
    });

router.get('/', function(req, res, next) {
    res.render( 'login' );
    });

router.post('/create', function (req,res) {
    console.log(req.body);
    database.get("users")
    .push(req.body)
    .write();

    res.render('login', {created: "Sucess!"});
    });

module.exports = router;
