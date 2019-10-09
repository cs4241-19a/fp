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

//const FileStore = require('session-file-store')(session);
//app.use(session({
//  genid: function(request){
//    return uuid();
//  },
//  store: new FileStore(),
//    secret: 'derps',
//    resave: false,
//    saveUninitialized: false
//}));
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

app.get('/admin', async function(req, res) {
  console.log(await jobCol.find({ }).toArray());
  res.sendFile(__dirname + '/public/views/admin.html');
});

app.get('/users', async function(req,res){
  if( userCol !== null ) {
    //console.log( await userCol.find({ }).toArray());
    // get array and pass to res.json
    await userCol.find({ }).toArray().then(result =>
      res.json(result)
      );
  }
})

app.get('/register', function(req, res){
  res.sendFile(__dirname + '/public/views/register.html');
} )
// Returning statistics of the user for user view page
// TODO handle users who aren't logged in
app.get('/userData', function(req, res) {
  console.log('Looking for user:', req.session.passport.user);
  userCol.findOne({uuid: req.session.passport.user}, function(err, result) {
    if(err) {res.sendStatus(503)}
    else {
      console.log(result)
      res.json(result);
    }
  });
});

app.get('/jobList', async function(req, res) {
  await jobCol.find({}).toArray().then(jobList => {
    res.json(jobList);
  });
});


// Passport authentication on login
app.post('/login', 
    (req, res, next) => {
  console.log('Inside POST /login callback')
  
  passport.authenticate('local', (err, user, info) => {   
    req.login(user, (err) => {
      // TODO get redirect to work
      return res.redirect('/');
    })
  })(req, res, next);
  
  });

app.post('/signoff', function(req, res) {
  // TODO Signoff jobs here
});

app.post('/register', function(req, res){
  const per = req.body;
  per.level = "standard";
  per.point = 0;
  per.jobs = {};
  per.active = "active";

  userCol.findOne({uuid: per.uuid}, function(err, perFound){
    if(err){return console.log(err)};
    if(!perFound){userCol.insertOne(per)}
    res.sendFile(__dirname + '/public/views/register.html');
  });
})
// Toggles automatic updates
app.post('/toggle', function(req, res) {
  active = !active;
  res.sendStatus(200);
});

// Admin job modifying
app.post('/modify', function(req, res){
    const job = req.body;
    const date = new Date(req.body.date);
    var day = "";
    
    switch(date.getDay()+ 1){
      case 2:
        day = "tues";
        break;
      case 4:
        day = "thur";
        break;
      default:
        day = "Nope"
        break;
    }
     
    job.jobCode = day + job.jobCode;
    job.status = {completed: false, late: false, signoff: ''};
    if(job.point === ''){
      job.point = 69;
    }
    console.log(job);
    
    jobCol.findOne({jobCode: job.jobCode}, function(err, jobFound){
      if(err){return console.log(err)};
      if(!jobFound){jobCol.insertOne(job)}
      else {
        jobCol.updateOne({jobCode: job.jobCode}, 
          {$set: {name: job.name,
            date: job.date,
            point: job.point,
            status: job.status}})
      }
      res.sendFile(__dirname + '/public/views/admin.html');
    });
    
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