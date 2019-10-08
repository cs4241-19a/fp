const express = require('express'),
      app = express(),
      bodyparser = require('body-parser'),
      morgan = require('morgan'),
      mongodb = require('mongodb'),
      schedule = require('node-schedule'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      session = require('express-session');

var active = false;



// MongoDB Setup
const uri = 'mongodb+srv://admin:admin@data-n1exc.mongodb.net/admin?retryWrites=true&w=majority';
const client = new mongodb.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology:true});
var jobCol = null;
var msgCol = null;
var userCol = null;
var dataCol = null;

client.connect()
  .then(client => {
    const db = client.db('db');
    jobCol = db.collection('jobs');
    msgCol = db.collection('messages');
    userCol = db.collection('users');
    dataCol = db.collection('userData');
    return jobCol !== null && msgCol !== null && userCol !== null && dataCol !== null;
  })
  .then(ok => {
    if(ok) {
      console.log('All collections obtained');
    } else console.log('Something went wrong getting a collection...');
  })
  .catch(err => console.log(err));



// Passport setup
const localStrategy = function(username, password, done) {
  console.log('Authenticating user:', username);
  userCol.findOne({username: username}, function(err, user) {
    if(err) {return done(err)};
    console.log('User from DB:', user);
    if(!user) {
      return done(null, false, {message: 'Username does not exist'});
    }
    else {
      if(password != user.password) {
        return done(null, false, {message: 'Incorrect password'});
      }
    }
    return done(null, user);
  });
}

passport.serializeUser(function(user, done) {
  console.log('User serialized:', user.name);
  done(null, user.uuid);
});

passport.deserializeUser(function(uuid, done) {
  userCol.findOne({uuid: uuid}, function (err, user) {
    console.log('User deserialized:', user.name);
    done(err, user);
  });
});


// Middleware
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
passport.use(new LocalStrategy(localStrategy));
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next) => {
  if(jobCol !== null && msgCol !== null && userCol !== null && dataCol !== null) {
    next();
  }
  else{
    res.sendStatus(503);
  };
});



// Handling Routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/login', function(req, res) {
  res.sendFile(__dirname + '/public/views/login.html');
});

app.get('/user', function(req, res) {
  res.sendFile(__dirname + '/public/views/user.html');
});

app.get('/admin', function(req, res) {
  res.sendFile(__dirname + '/public/views/admin.html');
});

// Returning statistics of the user for user view page
// TODO handle users who aren't logged in
app.get('/userData', function(req, res) {
  dataCol.findOne({uuid: req.user.uuid}, function(err, result) {
    if(err) {res.sendStatus(503)}
    else {
      res.json(result);
    }
  });
});



// Passport authentication on login
app.post('/login', passport.authenticate('local'),
  function(req, res) {
    res.json({status: true});
  }
);

app.post('/signoff', function(req, res) {
  // TODO Signoff jobs here
});

// Toggles automatic updates
app.post('/toggle', function(req, res) {
  active = !active;
  res.sendStatus(200);
});



// Automatic scheduled updates
// Updates job list every Sunday at 5:00 PM
var update = schedule.scheduleJob({hour: 17, minute: 0, dayOfWeek: 0}, function() {
  // TODO update job listings here
  console.log('Test');
});



const listener = app.listen(process.env.PORT || 3000, function() {
  console.log('App is listening on port ' + listener.address().port);
});