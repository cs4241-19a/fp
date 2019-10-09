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
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false}));
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
  if(req.isAuthenticated()){
  res.sendFile(__dirname + '/public/views/user.html');
  }else {
    
    res.sendFile(__dirname + '/public/views/login.html');
    }
});

app.get('/admin', async function(req, res) {
  //console.log(await jobCol.find({ }).toArray());
  if(req.isAuthenticated() && req.user.level === 'admin'){
    console.log("Authenticated");
    res.sendFile(__dirname + '/public/views/admin.html');
  }else{
    console.log("NotAuthed");
  res.redirect('/');
  };
});

app.get('/users', async function(req,res){
  if( userCol !== null ) {
    //console.log( await userCol.find({ }).toArray());
    // get array and pass to res.json
    await userCol.find({ }).toArray().then(result =>
      res.json(result)
      );
  };
});

app.get('/register', function(req, res){
  res.sendFile(__dirname + '/public/views/register.html');
});

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
  // TODO signoff jobs here
});

app.post('/register', function(req, res){
  const per = req.body;
  per.level = "standard";
  per.point = 0;
  per.jobs = [];
  per.active = "active";
  per.preferred = [];

  userCol.findOne({uuid: per.uuid}, function(err, perFound){
    if(err){return console.log(err)};
    if(!perFound){userCol.insertOne(per)}
    res.sendFile(__dirname + '/public/views/register.html');
  });
});

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

app.post('/modifyAll', function(req, res){
  //console.log(req.body);
  let jobs = req.body;

  jobs.forEach(function(job){
    jobCol.findOne({jobCode: job.jobCode}, function(err, jobFound){
      jobCol.updateOne({jobCode: job.jobCode},
        {$set: {name: job.name}})
    })
    //console.log(job);
  })
})

// Manual override for updating jobs
app.post('/forceUpdate', function(req, res) {
  update();
  res.sendStatus(200);
});

app.post('/resetjobs', function(req,res){
  userCol.updateMany({},{$set: {jobs:[]}});
})
// Automatic scheduled updates
// Updates job list every Sunday at 5:00 PM
var schedUpdate = schedule.scheduleJob({hour: 17, minute: 0, dayOfWeek: 0}, function() {update();});

// Function to update listing of house jobs 
// TODO change job date values for next week
var update = async function() {
  // Read through current list of jobs
  await jobCol.find({}).toArray().then(jobs => {
    // Add jobs to each user's history
    jobs.forEach(job => {
      // Calculate job point value base on status
      let pointVal = job.point;
      if(!job.status.complete) {pointVal = -pointVal}
      else {if(job.status.late) {pointVal /= 2}};
      job.point = pointVal;
      // Adding job to user
      userCol.updateOne({name: job.name},
        {$push: {jobs: job}});
    });
  });

  let today = new Date();
  // Number of ms in a day
  let day = 1000 * 60 * 60 * 24

  // Discard old jobs (more than 8 weeks ago)
  userCol.updateMany({}, {$pull: {jobs: {date: {$lt: today - (day * 42)}}}});

  // Reset job values (date changed seperately)
  jobCol.updateMany({}, 
    {$set: 
      {name: '',
      point: 1,
      status: 
        {complete: false,
        late: false,
        signoff: ''}}});

  // Change job dates
  //TODO
  let userList = [];
  // Calculate points
  await userCol.find({}).toArray().then(users => {
    users.forEach(user => {
      let points = 0;
      if(user.jobs.length > 0) {
        user.jobs.forEach(job => {
          points += job.point;
        });
        userCol.updateOne({name: user.name}, 
          {$set: {point: points}});
      }
      else {userCol.updateOne({name: user.name},
        {$set: {point: 0}})};
    });

    // Sort users by point value (default to uuid if points are identical)
    // Currently sorts with lowest points being first
    // Lower UUID will be put to the front
    // Swap the comparisons to reverse (later implementation of a new system)
    // TODO remove people from the lsit who are N/A
    let sortedList = users.sort((a, b) => (a.point > b.point) ? 1 : (a.point === b.point) ? ((parseInt(a.uuid) < parseInt(b.uuid)) ? 1 : -1) : -1);
    console.log('List of Users:', sortedList);
    userList = sortedList;
  });
  // Assign each user a house job randomly
  //    Edit name of job to user's name, and reset status
  let assigned = [];
  await jobCol.find({}).toArray().then(jobs => {
    jobs.forEach(job => {
      // Picks a random user and checks if they have a job yet
      let rand = Math.round(Math.random() * 24);
      while(assigned.includes(rand)) {
        rand = Math.round(Math.random() * 24);
      };
      assigned.push(rand);
      console.log('Selected User:', userList[rand].name, '  For Job:', job.jobCode, ' (Random Index):', rand);
      // Assigns job to random user
      jobCol.updateOne({jobCode: job.jobCode},
        {$set: {name: userList[rand].name}});
    });
  });
};

// Scheduled functions to mark jobs late
var markLateTues = schedule.scheduleJob({hour: 9, minute: 0, dayOfWeek: 3}, async function() {markLate('tues')});
var markLateThur = schedule.scheduleJob({hour: 9, minute: 0, dayOfWeek: 5}, async function() {markLate('thur')});

// Marks all incomplete jobs as late for given day
var markLate = async function(day) {
  await jobCol.find({day: day}).then(jobs => {
    jobs.forEach(job => {
      if(!job.status.complete) {
        jobCol.updateOne({jobCode: job.jobCode},
          {$set: {status: {late: true}}})}
    });
  });
};

const listener = app.listen(process.env.PORT || 3000, function() {
  console.log('App is listening on port ' + listener.address().port);
});

