const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pouchdb = require('pouchdb');
pouchdb.plugin(require('pouchdb-upsert'));
const db = new pouchdb('my_db');

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

app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true })
);

app.listen(port, function () {
    'use strict';
    console.log(`Example app listening on port !`);
});

db.get('users').catch(function (err) {
    if (err.name === 'not_found') {
        return {
            _id: 'users',
            users: []
        };
    } else { // hm, some other error
        throw err;
    }
}).then(function (doc) {
    User = doc.users;
}).catch(err => {
    console.log(err);
});