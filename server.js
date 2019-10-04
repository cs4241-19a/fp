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

let User = [];

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(compression());

app.use(express.static('public'));
//app.use(sessions({secret: '{secret}', name: 'session_id', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (request, response) {
    'use strict';
    response.sendFile(__dirname + '/views/login.html');
});

app.get('/login', function (request, response) {
    'use strict';
    response.sendFile(__dirname + '/views/login.html');
});

app.post('/login',
    passport.authenticate('local', { successRedirect: '/index',
        failureRedirect: '/',
        failureFlash: 'Invalid username or password' })
);

app.get('/index', function (request, response) {
    'use strict';
    response.sendFile(__dirname + '/views/index.html');
});

app.get('/signup', function (request, response) {
    'use strict';
    response.sendFile(__dirname + '/views/signup.html');
});

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'passwd',
        session: false
    },
    function(username, password, done) {
        const user1 = User.find(user => user.username === username);
        if (!user1) {
            return done(null, false, {message: "Incorrect user"});
        } else if (user1.password === password) {
            return done(null, {username, password});
        } else {
            return done(null, false, {message: "Incorrect password"});
        }
    }
));

app.post('/createUser', function (req, res) {
    let newUser = req.body;
    const user1 = User.find(user => user.username === newUser.newUsername);
    if (!user1) {
        newUser = {
            username: newUser.newUsername,
            password: newUser.newPassword,
        };
        User.push(newUser);
        let userDoc = {
            _id: 'users',
            users: User
        };
        db.upsert('users', function (doc) {
            doc.counter = doc.counter || 0;
            doc.counter++;
            doc.users = User;
            return doc;
        }).catch(err => {
            console.log(err);
        });
    }
    res.sendFile(__dirname + '/views/login.html');
});

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
    } else {
        throw err;
    }
}).then(function (doc) {
    User = doc.users;
}).catch(err => {
    console.log(err);
});

