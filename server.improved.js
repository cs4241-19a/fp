const mongo = require('mongodb');
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
const compression = require("compression");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const express = require("express");
const app = express();
const port = 3001;

let users;
let productList;

let uri = 'mongodb+srv://jyxiao:mongoexample@cluster0-g4tmu.mongodb.net/admin?retryWrites=true&w=majority';

const mongoClient = new mongo.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

mongoClient.connect().then(()=>{
    return mongoClient.db('RhythmGame').collection('users');
}).then(getUsers => {
    users = getUsers;
    return getUsers.find().toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});

function parseSongDirectory(){
    let dir = "./public/resources/audio/songs";
    let fs = require("fs");
    let files = fs.readdirSync(dir); //stackoverflow told me to ignore this warning
    let list = [];
    files.forEach(function (subdir) {
        list.push(subdir.toString());
    });
    return ({"songs": list});
}

function shouldCompress(req, res) {
    if (req.headers["x-no-compression"]) {
        return false;
    }
    return compression.filter(req, res);
}

app.use(helmet());
app.use(compression({filter: shouldCompress}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

/** Login (Passport) **/
passport.use(new LocalStrategy (
    function(username, password, done) {
        users.findOne({username: username}).then((user, err) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'User not found.'});
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password.'});
            }else{
                return done(null, user);
            }
        })
    }
));

passport.serializeUser( (user, done) => done(null, user.username));

passport.deserializeUser( (username, done) => {
    users.findOne({
        username: username
    }).then(user => {
        if( user !== undefined ) {
            done(null, user);
            console.log(user);
        }else{
            done(null, false, {message: 'User not found.'});
        }
    });
});

// Create database instance and start server
app.use(compression());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.get("/index", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.post("/songRequest", function (request, response) {
    console.log("songrec");
    response.json(parseSongDirectory());
});

app.post('/loginAttempt',
    passport.authenticate('local'/*, {failureRedirect: '/login'}*/),
    function(request, response) {
        response.json({status: true});
    });

app.post('/logoutAttempt',
    function(request, response) {
        request.logout();
        response.redirect("/login");
    });

app.post('/registerAttempt', function (request, response) {
    users.findOne({
        username: request.body.username
    }).then(result => {
        if (result === null) {
            users.insertOne({
                username: request.body.username,
                password: request.body.password
            }).then(err=>{console.log(err)});
            response.json({status: true});
        } else {
            response.json({status: false});
        }
    })
});

app.post('/submitHighScore', function(request, response) {
    // let user = request["username"];
    let songname = request["songname"];
    let score = request["score"];
    let maxCombo = request["maxCombo"];
    let percentage = request["percentage"];

    //TODO create the high score object/document here
    mongoClient.connect().then(()=>{
        let songs = mongoClient.db('RhythmGame').collection('songs');
        songs.findOne({ name: songname}).then(song => {
            let scoreList = song["scores"];

            song.updateOne(
                { },
                { $pull: { scores: { username: request.session.passport.user } } });

            //TODO check for empty high score array
            scoreList.forEach(function(otherScore, index){
                    if(otherScore <= score){
                        song.updateOne(
                            {$push: {
                                    scores: {
                                        $each: [ /*TODO high score object*/ ],
                                        $position: index
                                    }
                                }
                            });
                    }
            }); //insert the highscore so as to keep it sorted

            response.json = song["scores"];
        });
    });
    response.json({status: true});
});

app.post('/getHighScore', function(request, response) {
    mongoClient.connect().then(()=>{
        let songs = mongoClient.db('RhythmGame').collection('songs');
        songs.findOne({ name: request["name"]}).then(song => {
            let scoreList = song["scores"];
            response.json = song["scores"];
        });
    });
});

app.listen(port);