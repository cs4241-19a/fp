const express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    session = require('express-session'),
    request = require('request'),
    cors = require('cors'),
    querystring = require('querystring'),
    //TODO: delete comment if possible
    //mongodb = require('mongodb'),
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
    //TODO: delete comment if possible
    //code = '?response_type=code',
    stateKey = 'spotify_auth_state'


let currentUser = [],
    access_token = null,
    refresh_token = null,
    product = null,
    track_id = '3n3Ppam7vgaVa1iaRUc9Lp',
    audioAnalysis;

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

const generateRandomString = function (length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.get("/", isLoggedIn, function (req, res) {
    res.sendFile(__dirname + "/public/home.html")
})
app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/public/login.html")
})

app.get("/spotifyAccess", function (req, res) {
    //TODO: delete comment if possible
    //let code = '?response_type=code'
    let state = generateRandomString(16);
    res.cookie(stateKey, state);
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scopes,
            redirect_uri: redirect_uri,
            state: state
        }))
})

app.get('/callback', function (req, res) {

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
                'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                access_token = body.access_token
                refresh_token = body.refresh_token;

                const options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {'Authorization': 'Bearer ' + access_token},
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
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
app.post('/currentTrack', function (req, res) {
    let parsedData = req.body
    track_id = parsedData.track
})

app.get('/trackAnalysis', function (req,res) {
    const options = {
        url: 'https://api.spotify.com/v1/audio-analysis/'+track_id, //req.body
        headers: {'Authorization': 'Bearer ' + access_token},
        json: true
    };
    request.get(options, function(response,body){
        //console.log(body)
        res.send(body)

    })
})


app.get('/refresh_token', function (req, res) {

    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))},
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

app.get("/trackInfo",function(req,res){
    var authOptions = {
        url: 'https://api.spotify.com/v1/audio-analysis/06AKEBrKUckW0KREUWRnvT',
        headers: {'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        }
        if(res){
            const track = JSON.parse(res.body)
        }
})


app.get("/user", function (req, res) {
    const json = {
        user: currentUser[0]
    }
    res.send(JSON.stringify(json))
})

app.get("/token", function (req, res) {
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

app.get("/recommendation", function (req, res) {
    new Promise(function (resolve, reject) {
        mongo.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, client) => {
            if (err) {
                reject(err)
            }
            const db = client.db('MusicApp')
            const collection = db.collection('recommendations')
            collection.find({}).toArray().then(function (arr) {
                let entries = []
                arr.forEach(function (element) {
                    const jaysawn = JSON.parse(JSON.stringify(element))
                    if (jaysawn.username == null)
                        console.log("null username")
                    else if (jaysawn.songid == null)
                        console.log("null songid")
                    else if (jaysawn.rating == null)
                        console.log("null rating")
                    else if (jaysawn.caption == null)
                        console.log("null caption")
                    else if (jaysawn.songname == null)
                        console.log("null songname")
                    else if (jaysawn.artist == null)
                        console.log("null artist")
                    else {
                        let entry = {
                            username: jaysawn.username,
                            songid: jaysawn.songid,
                            rating: jaysawn.rating,
                            caption: jaysawn.caption,
                            songname: jaysawn.songname,
                            artist: jaysawn.artist
                        }
                        entries.push(entry)
                    }
                })
                res.send(JSON.stringify(entries))
            })
        })
    })
})

app.post("/login",
    passport.authenticate("local-login", {failureRedirect: "/"}),
    function (req, res) {
        res.redirect("/spotifyAccess") //redirects to spotify access page once sign in authorizes
    }
)

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
                if (req.body.username === "badUsernameZQFMGB") return
                collection.insertOne({
                    "username": req.body.username,
                    "password": hash
                }).then(() => res.redirect("/"))
            })
        })
    })
})

app.post("/recommendation", function (req, res) {
    new Promise(function (resolve, reject) {
        mongo.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, client) => {
            if (err) {
                reject(err)
            }
            const db = client.db('MusicApp')
            const collection = db.collection('recommendations')
            collection.insertOne({
                "username": req.body.username,
                "songid": req.body.songid,
                "rating": req.body.rating,
                "caption": req.body.caption,
                "songname": req.body.songname,
                "artist": req.body.artist
            }).then(() => {
                // Uncomment the next line and comment the one after it to clear all recommendations
                //collection.deleteMany({}).then(res.redirect("/"))
                res.redirect("/");
            })
        })
    })
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next()
    res.redirect("/login")
}

//added in order to run the server
app.listen(process.env.PORT || 3000)
module.exports = app
