const express = require("express"),
    path = require("path"),
    http = require("http"),
    app = express(),
    port = (process.env.PORT || 3000),
    low = require('lowdb'),
    FileSync = require('lowdb/adapters/FileSync'),
    bodyParser= require( 'body-parser' ),
    session   = require( 'express-session' ),
    passport  = require( 'passport' ),
    Local     = require( 'passport-local' ).Strategy,
    mime = require("mime");

const adapter = new FileSync('db.json');
const db = low( adapter );

db.defaults({ users: [] }).write();

app.use(express.static(path.join(__dirname + "/public")));
app.use(bodyParser.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/views/index.html"));
});

app.get("/img/:filename", function(req, res) {
    const filename = req.params["filename"];
    const extensionIndex = filename.lastIndexOf(".");
    const extension = filename.slice(extensionIndex, filename.length);

    res.header("Content-Type", mime.getType(extension));
    res.sendFile(path.join(__dirname + "/src/img/" + filename ));

    console.log("/img/" + filename);
});

app.get("/js/scripts.js", function(req, res) {
    res.sendFile(path.join(__dirname + "/js/scripts.js"));
});

app.get("/js/click.js", function(req, res) {
    res.sendFile(path.join(__dirname + "/js/click.js"));
});

app.post("/update", function(req, res) {
    let dataString = '';
    req.on( 'data', function( data ) {
        dataString += data
    });

    req.on( 'end', function() {
        const updatedUser = JSON.parse(dataString);
        db.get('users')
            .find({ username: updatedUser.username })
            .assign({ score: updatedUser.score, gameState: updatedUser.gameState})
            .write();

        res.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
        res.end();
    })
});

app.get("/leaderboard", function(req, res) {
    const state = db.getState();
    const str = JSON.stringify(state, null, 2);
    sendLeaderboardData(res, str);
});

const sendLeaderboardData = function( response, users ) {
    const type = mime.getType(users);
    response.writeHead(200, { 'Content-Type': type });
    response.write(users);
    response.end();
};

const myLocalStrategy = function(username, password, done) {
    const user = db.get('users').find({ username: username}).value();

    if (user === undefined) {
        const newUser = {
            'username': username,
            'password': password,
            'score': 0,
            'gameState': {}
        };

        db.get( 'users' ).push(newUser).write();
        return done( null, { username, password });
    }
    else if (user.password === password) {
        return done( null, { username, password });
    }
    else {
        return done( null, false, { message: 'incorrect password'});
    }
};

passport.use( new Local( myLocalStrategy ) );

passport.serializeUser( (user, done) => done( null, user.username));

passport.deserializeUser( (username, done) => {
    const user = db.get('users').find({ username: username}).value();

    if ( user !== undefined) {
        done( null, user);
    }
    else {
        done( null, false, { message: 'user not found; session not restored'})
    }
});

app.use( session({ secret:'cats cats cats', resave:false, saveUninitialized:false }) );
app.use(passport.initialize());
app.use(passport.session());

app.post(
    '/login',
    passport.authenticate( 'local'),
    function( req, res ) {
        res.json({status: true})
    }
);

let server = http.createServer(app);
server.listen(port, function () {
    console.log("server started running");
});