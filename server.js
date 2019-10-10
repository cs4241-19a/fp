// Setup
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(express.static('public'))
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

const morgan = require('morgan')
app.use(morgan('tiny'))

const favicon = require('serve-favicon')
app.use(favicon(__dirname + '/public/img/favicon.png'))

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.listen(3000)

// ================================================================================

// MongoDB
const mongodb = require('mongodb')
const uri = 'mongodb+srv://percy:percy@percy0-a4fle.mongodb.net/admin?retryWrites=true&w=majority'

const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
let collection = null

let allUsers
const copyAllUsers = function() { collection.find({}).toArray().then(result => allUsers = result) }
client.connect().then(() => {
    return client.db('percy-a5').createCollection('users')
}).then(__collection => {
    collection = __collection
    return collection.find({}).toArray()
}).then(result => allUsers = result)

app.use((req, res, next) => {
    if (collection !== null) next()
    else res.status(503).send()
})

// ================================================================================

// Passport
const passport = require('passport');
const Local = require('passport-local').Strategy;
const session = require('express-session');

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
    if (user !== undefined) done(null, user)
    else done(null, false, { message: 'user not found; session not restored' })
})
app.use(session({ secret: 'cats cats cats', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.post('/test', function(req, res) {
    console.log('authenticate with cookie?', req.user)
    res.json({ status: 'success' })
})

app.post('/login', passport.authenticate('local'), function(req, res) {
    you = allUsers.find(__user => __user.username === req.user.username)
    res.json({ status: true })
})

// ================================================================================

// GET
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
})
app.get('/checkDup', function(request, response) {
    let usernames = []
    for (let i = 0; i < allUsers.length; i++) {
        usernames.push(allUsers[i]['username'])
    }
    response.send(usernames)
})
app.get('/refreshAll', function(request, response) {
    collection.find({}).toArray().then(result => response.json(result))
})
app.get('/getYou', function(request, response) {
    you = allUsers.find(__user => __user.username === you.username)
    response.send(you)
})

// ================================================================================

// POST
app.post('/add', function(request, response) {
    collection.insertOne(request.body).then(result => {
        response.json(result)
        copyAllUsers()
    })
})

app.post('/delete', function(request, response) {
    collection.deleteOne({ _id: mongodb.ObjectID(you._id) }).then(result => {
        response.json(result)
        copyAllUsers()
    })
})

app.post('/updateInfo', function(request, response) {
    collection.updateOne({ _id: mongodb.ObjectID(you._id) }, {
        $set: {
            name: request.body.name,
            age: request.body.age,
            gender: request.body.gender,
            hobby: request.body.hobby,
            pic: request.body.pic,
            salary: request.body.salary,
            whatsUp: request.body.whatsUp,
            location: request.body.location,
            selfIntro: request.body.selfIntro
        }
    }).then(result => {
        response.json(result)
        copyAllUsers()
    })
})
app.post('/updateUser', function(request, response) {
    // console.log(request.body)
    collection.updateOne({ _id: mongodb.ObjectID(request.body._id) }, {
        $set: {
            likedList: request.body.likedList,
            blackList: request.body.blackList,
            comments: request.body.comments,
            likes: request.body.likes,
            dislikes: request.body.dislikes
        }
    }).then(result => {
        response.json(result)
        copyAllUsers()
    })
})

// ================================================================================

// Response Time
const responseTime = require('response-time')
const StatsD = require('node-statsd')
const stats = new StatsD()
stats.socket.on('error', function(error) {
    console.error(error.stack)
})
app.use(responseTime(function(req, res, time) {
    let stat = (req.method + req.url).toLowerCase()
        .replace(/[:.]/g, '')
        .replace(/\//g, '_')
    stats.timing(stat, time)
}))

// ================================================================================