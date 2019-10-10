var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'),
    passport = require('passport'),
    Strategy = require('passport-local').Strategy,
    db = require('./db'),
    low = require('lowdb'),
    database,
    theUser;

var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('./data/userData.json');
var database = low(adapter);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var gameRouter = require('./routes/game');
var scoresRouter = require('./routes/scores');
var leaderboardRouter = require('./routes/leaderboard');
var profileRouter = require('./routes/profile');

passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });
  
  passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize()); 
app.use(passport.session());
app.use(express.static('public'));

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/users/create', usersRouter);
app.use('/game', gameRouter);
app.use('/scores', scoresRouter);
app.use('/leaderboard',leaderboardRouter);
app.use('/login/profile', loginRouter);
app.use('/scores/highscore', scoresRouter);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("404 url: " + req.url)
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
