// Setup
const express = require('express');
const app = express();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.json());

const passport = require('passport');
const Local = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.listen(3000);
// ========================================================================================================

// The main dataset
db.defaults({ allUsers: [] }).write();
let allUsers;
const copyAllUsers = function() {
    allUsers = [];
    let j = 0;
    while (true) {
        let row = db.get(`allUsers[${j}]`).value();
        if (row) allUsers.push(row)
        else break
        j++;
    }
};
copyAllUsers();
// ========================================================================================================

// Passport
let you = {};

const myLocalStrategy = function(username, password, done) {
    const user = allUsers.find(__user => __user.username === username);
    if (user === undefined) return done(null, false, { message: 'user not found' });
    else if (user.password === password) return done(null, { username, password });
    else return done(null, false, { message: 'incorrect password' });
};

passport.use(new Local(myLocalStrategy))
passport.initialize()

passport.serializeUser((user, done) => done(null, user.username))
passport.deserializeUser((username, done) => {
    const user = allUsers.find(u => u.username === username)
    if (user !== undefined) {
        done(null, user)
    } else {
        done(null, false, { message: 'user not found; session not restored' })
    }
})
app.use(session({ secret: 'cats cats cats', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.post('/test', function(req, res) {
    console.log('authenticate with cookie?', req.user)
    res.json({ status: 'success' })
})

app.post(
    '/login',
    passport.authenticate('local'),
    function(req, res) {
        you = allUsers.find(__user => __user.username === req.user.username)
        res.json({ status: true })
    }
)

// ========================================================================================================

// Register Page
app.post('/add', function(request, response) {
    db.get('allUsers').push(request.body).write()
    copyAllUsers()
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end()
})
app.get('/checkDup', function(request, response) {
    let usernames = []
    for (let i = 0; i < allUsers.length; i++) {
        usernames.push(allUsers[i]['username'])
    }
    response.send(usernames)
})

// ========================================================================================================

// Modify Page
app.post('/update', function(request, response) {
    let body = request.body

    db.get('allUsers')
        .find({ username: you.username })
        .assign({
            name: body.name,
            age: body.age,
            gender: body.gender,
            hobby: body.hobby
        }).write()
    copyAllUsers()
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end();
})
app.post('/delete', function(request, response) {
    db.get('allUsers').remove({ username: you.username }).write()
    copyAllUsers()
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end();
})

// ========================================================================================================

// Tables Page
app.get('/refreshAll', function(request, response) {
    response.send(allUsers);
});
app.get('/getYou', function(request, response) {
    response.send(you)
});
app.post('/updateYou', function(request, response) {
    let you = request.body
    db.get('allUsers').find({ username: you.username }).assign({ likedList: you.likedList, blackList: you.blackList }).write()
    copyAllUsers();
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end();
})
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

// ========================================================================================================