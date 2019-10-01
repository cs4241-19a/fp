const express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    session = require('express-session'),
    mongodb = require('mongodb'),
    mongo = require('mongodb').MongoClient,
    bcrypt = require('bcrypt'),
    url = "mongodb+srv://root:admin@cluster0-qdoiu.azure.mongodb.net/test?retryWrites=true&w=majority",
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    app = express(),
    favicon = require('serve-favicon'),
    client_id = 'f250b3f0ce604150b056707b8e25a328',
    client_secret = 'c26768e1850047ceba186a08bb061a9d', //this is VERY IMPORTANT and should NEVER be revealed in public
    redirect_uri = 'http://localhost:3000', //redirects to this when authorization passes or fails
    scopes = 'user-read-private user-read-email',
    code = '?response_type=code'

let currentUser = []

app.use(favicon(__dirname + '/public/images/favicon.ico'))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: "tHiSiSasEcRetStr",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user, done) => done(null, currentUser[0].username))
passport.deserializeUser((username, done) => {
    if (currentUser[0] !== undefined) {
        done(null, currentUser[0])
    } else {
        done(null, false, {message: 'user not found; session not restored'})
    }
})
passport.use('local-login', new LocalStrategy(
    function (username, password, done) {
        new Promise(function (resolve, reject) {
            mongo.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, (err, client) => {
                if (err) {
                    reject(err)
                }
                const db = client.db('MusicApp')
                const collection = db.collection('user')
                collection.find({"username": username}).toArray((err, items) => {
                    resolve(items)
                })
            })
        }).then(function (result) {
            if (typeof result[0] == 'undefined') {
                return done(null, false, {"message": "Wrong username"})
            } else {
                currentUser = result
                bcrypt.compare(password, result[0].password, function (err, res) {
                    if (res) {
                        return done(null, result[0])
                    } else {
                        return done(null, false, {"message": "Password incorrect"})
                    }
                })
            }
        }, function (err) {
            return done(null, false, {"message": "User not found."})
        })
    })
)
app.get("/", isLoggedIn, function (req, res) {
    console.log("test")
    res.sendFile(__dirname + "/public/home.html")
})
app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/public/login.html")
})

app.get("/spotifyAccess", function (req, res) {
    res.redirect('https://accounts.spotify.com/authorize' +
        code +
        '&client_id=' + client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri))//__dirname + "/spotifyInfo"))
    console.log(code)
})

// app.post("/spotifyInfo",function(req,res){
//     res.redirect('https://accounts.spotify.com/api/token',
//         data: {
//             grant_type: "authorization_code",
//             "code":code,
//             "redirect_uri": redirect_uri,
//             "Authorization": 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//         }
//         console.log(JSON.parse(res))
// )
// })

app.get("/register", function (req, res) {
    res.sendFile(__dirname + "/public/register.html")
})
app.get("/logout", function (req, res) {
    req.logout()
    res.redirect("/")
})
app.post("/login",
    passport.authenticate("local-login", {failureRedirect: "/"}),
    function (req, res) {
        res.redirect("/spotifyAccess") //redirects to spotify access page once sign in authorizes
    })
app.post("/register", function (req, res) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        new Promise(function (resolve, reject) {
            mongo.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, (err, client) => {
                if (err) {
                    reject(err)
                }
                const db = client.db('MusicApp')
                const collection = db.collection('user')
                collection.insertOne({
                    "username": req.body.username,
                    "password": hash
                }).then(r => res.redirect("/"))
            })
        })
    })
})

function isLoggedIn(req, res, next) {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated())
        return next()
    res.redirect("/login")
}
//added in order to run the server
app.listen(process.env.PORT || 3000)
module.exports = app
