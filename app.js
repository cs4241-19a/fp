const express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    session = require('express-session'),
    request = require('request'),
    cors = require('cors'),
    querystring = require('querystring'),
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
    redirect_uri = 'http://localhost:3000/callback', //redirects to this when authorization passes or fails
    scopes = 'user-read-private user-read-email streaming app-remote-control',
    //code = '?response_type=code',
    stateKey = 'spotify_auth_state'



let currentUser = [],
    access_token = null,
    refresh_token = null,
    product = null

app.use(favicon(__dirname + '/public/images/favicon.ico'))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors())
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
            } else
                {
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

const generateRandomString = function(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.get("/", isLoggedIn, function (req, res) {
    console.log("test")
    res.sendFile(__dirname + "/public/home.html")
})
app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/public/login.html")
})

app.get("/spotifyAccess", function (req, res) {
    //let code = '?response_type=code'
    let state = generateRandomString(16);
    res.cookie(stateKey, state)//, {SameSite:'None', secure:true});
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scopes,
            redirect_uri: redirect_uri,
            state: state
        }))
})

app.get('/callback', function(req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter

    let code = req.query.code || null;
    let state = req.query.state || null;
    let storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {

                access_token = body.access_token
                refresh_token = body.refresh_token;

                const options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {'Authorization': 'Bearer ' + access_token},
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function(error, response, body) {
                    console.log(body);
                    //console.log("The Product is: " + body.product)
                    product = body.product
                    console.log('token = '+ access_token)
                });

                // we can also pass the token to the browser to make requests from there
                res.redirect('/#' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }))
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});


app.get('/refresh_token', function(req, res) {

    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

app.get("/token", function (req,res){
    const answerObj = {}
    answerObj.name = "token"
    answerObj.name = "product"
    answerObj.product = product
    answerObj.token = access_token
    res.send(JSON.stringify(answerObj))
})

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
    //console.log(req.isAuthenticated())
    if (req.isAuthenticated())
        return next()
    res.redirect("/login")
}
//added in order to run the server
app.listen(process.env.PORT || 3000)
module.exports = app
