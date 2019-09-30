const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let port = process.env.PORT || 3000;

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(compression());

app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (request, response) {
    'use strict';
    response.sendFile(__dirname + '/views/index.html');
});

app.post('/login', passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login' }));

app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/users/' + req.user.username);
});

app.listen(port, function () {
    'use strict';
    console.log(`Example app listening on port !`);
});
