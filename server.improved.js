const express = require("express"),
  path = require("path"),
  http = require("http"),
  app = express(),
  port = process.env.PORT || 3000,
  session = require("express-session"), //middleware for authentication
  passport = require("passport"), // middleware for authentication
  Local = require("passport-local").Strategy,
  bodyParser = require("body-parser"),
  morgan = require("morgan"), // middleware for logging HTTP requests
  helmet = require("helmet"), // middleware for setting HTTP headers
  responseTime = require("response-time"), // middleware for HTTP request response time
  StatsD = require("node-statsd"), // middleware for HTTP request response time
  mongodb = require("mongodb"),
  mime = require("mime"),
  dotenv = require("dotenv");

dotenv.config();

const uri =
  "mongodb+srv://anagha:" +
  process.env.MONGO_PASS +
  "@cluster0-vy0ms.azure.mongodb.net/admin?retryWrites=true&w=majority";

const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let currentUser = "";
let usersCollection = null;

app.use(express.static(path.join(__dirname + "/public")));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("combined"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/game.html", function(req, res) {
  res.sendFile(path.join(__dirname + "/game.html"));
});

app.get("/game.js", function(req, res) {
  res.sendFile(path.join(__dirname + "/game.js"));
});

app.get("/js/scripts.js", function(req, res) {
  res.sendFile(path.join(__dirname + "/js/scripts.js"));
});

const myLocalStrategy = function(username, password, done) {
  let user;
  usersCollection
    .find({})
    .toArray()
    .then(result => {
      console.log("TESTING " + result);
      user = result[0];
      console.log("Username: " + result);

      if (user.username === username && user.password === password) {
        currentUser = username;
        return done(null, { username, password });
      } else {
        return done(null, false, { message: "wrong password" });
      }
    });
};

passport.use(new Local(myLocalStrategy));

passport.serializeUser((user, done) => done(null, user.username));

passport.deserializeUser((username, done) => {
  let user;
  usersCollection
    .find({})
    .toArray()
    .then(result => {
      user = result[0];
      console.log("Query result: " + result);

      if (user !== undefined) {
        done(null, user);
      } else {
        done(null, false, { message: "no such user exists" });
      }
    });
});

app.use(
  session({
    secret: "supercalifragilesticexpialadocious",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/login", passport.authenticate("local"), function(req, res) {
  res.json({ status: true });
});

let server = http.createServer(app);
server.listen(port, function() {
  console.log("server started running");
});
