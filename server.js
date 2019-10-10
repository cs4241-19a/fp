const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      express = require('express'),
      passport = require('passport'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      session = require('express-session'),
      path = require('path'),
      low = require('lowdb'),
      FileSync = require('lowdb/adapters/FileSync'),
      adapter = new FileSync(path.join('data', 'db.json')),
      errorhandler = require('errorhandler'),
      fileStore = require('session-file-store')(session),
      Nexmo = require('nexmo'),
      TMClient = require('textmagic-rest-client'),
      nodemailer = require('nodemailer'),
      db = low(adapter),
      port = 3000

var helmet = require("helmet");
var compression = require("compression");
var uuid = require('uuid'); // random number generation
var bcrypt = require('bcryptjs'); // crypto functions!
var LocalStrategy   = require('passport-local').Strategy;
var db_pw = low(new FileSync(path.join('data', 'pw.json')));
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'doughboys.official@gmail.com',
    pass: 'sbccoqpxypofikrc'
  }
});
var c = new TMClient('tyronepatterson', 'hzJCSbcoqMwuslfzUhRRuVQRYFROOo');

db_pw.defaults({
  "users": []
}).write();

// Create global app object
var app = express();

app.use(cors());
app.use(helmet());
app.use(require('morgan')('dev'));
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'kobe', 
                  cookie: { maxAge: 24 * 60 * 60 * 1000 /* 24 hours */ }, 
                  resave: false, 
                  saveUninitialized: false,
                  store: new fileStore({ filename: path.join('data', 'sessionFile.json')})}));

db.defaults({
  "idcount": 1,
  "data": []
}).write();

app.use(passport.initialize());
app.use(passport.session());

// app.get('/fullOrders.json', (req, res) => res.send(JSON.stringify(data)));
app.get('/fullOrders.json', (req, res) => { res.send( db.value()), console.log(db.value())});


app.get('/userOrders.json', (req, res) => { 
  if(!req.user){
    return;
  }
  var jsonWrapper = {};
  jsonWrapper["data"] = db.get('data')
                          .filter(clientRow => clientRow[1] == req.user.username)
                          .value();
  res.send(jsonWrapper); 
});

app.post('/submit', function(req, res) {
  if(!req.user){
    return;
  }
  let clientData = Object.values(req.body);
  let message = "Hello "+  clientData[0] + ", your order of " + clientData[4] + " will be ready in exactly 30 seconds."
  // clientData[6] = message;
  let idcount = db.get('idcount').value();
  clientData.unshift(req.user.username);
  clientData.unshift(idcount.toString());
  db.set('idcount', idcount + 1).write();
   db.get('data')
     .push(clientData)
     .write();
  if(req.body.method === 'text') {
  
  c.Messages.send({
    text: message,
    phones: req.body.num
  }, function(err, res) {
    console.log('Messages.send()', err, res);
  });
  } else {
    var mailOptions = {
      from: 'doughboys.official@gmail.com',
      to: req.body.mail,
      subject: 'Doughboys order confirmation',
      text: message
    }
    transporter.sendMail(mailOptions, function(error, info) {
      if(error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    })
  }
});

app.post('/delete', function(req, res) {
  if(!req.user){
    return;
  }
  let clientData = Object.values(req.body);
  let deleteID = clientData[0];
  db.get('data')
    .remove(clientRow => clientRow[0] == deleteID && clientRow[1] == req.user.username)
    .write();
});



app.post('/modify', function(req, res) {
  try {
    if(!req.user){
      return;
    }
    
    let clientData = Object.values(req.body);
    let modifyID = clientData[0]; 
    let modifyColumn = clientData[1];
    let newData = clientData[2];
    let entryToModify = db.get('data')
                          .filter(clientRow => clientRow[0] == modifyID && clientRow[1] == req.user.username)
                          .first()
                          .value();
    
    if(!entryToModify){
        return;
    }
    
    switch(modifyColumn) {
      case "nam":
        entryToModify[2] = newData; break;
      case "num":
        entryToModify[3] = newData; break;
      case "add":
        entryToModify[4] = newData; break;
      case "ord":
        entryToModify[5] = newData; break;
      case "con":
        entryToModify[6] = newData; break;
      case "inf":
        entryToModify[7] = newData; break;
      case "mes":
        entryToModify[8] = newData; break;
    }
    db.get('data')
      .filter(clientRow => clientRow[0] == modifyID && clientRow[1] == req.user.username)
      .first()
      .assign(entryToModify)
      .write();
  }
  catch (e){
  }
});




app.post('/login.html', 
  passport.authenticate('local', { failureRedirect: '/login.html' }),
  function(req, res) {
    res.redirect('/');
  });

// takes a plain text password and returns a hash
function hashPassword(plaintextPassword) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plaintextPassword, salt);
}

// compare if plain text password matches hash password
function comparePassword(plaintextPassword, hashPassword) {
  return bcrypt.compareSync(plaintextPassword, hashPassword);
}


app.post('/signUp.html',function signup(req, res) {
  var username = req.body.username.trim();
  var password = req.body.password.trim();
  
  var options = {
    username: username,
    password: password,
    successRedirectUrl: '/login.html',
  }
  
  var usernames = db_pw.get('users').map('username').value()
  var usernameIsTaken = usernames.includes(options.username)

  if (usernameIsTaken) {
   res.redirect('/signUp.html')
  } else {
    db_pw.get('users')
      .push({
        username: options.username,
        id: uuid(),
        password: hashPassword(options.password)
      })
      .write()
    // redirect
    res.redirect(options.successRedirectUrl)
  }
});


app.use(function(req, res, next) {
  res.locals.errors = null;
  res.locals.user = req.user || null;
  next();
})


  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    var user = db_pw.get('users').find({id: id}).value()

    if(!user) {
      done({ message: 'Invalid credentials.' }, null);
    } else {
      done(null, {id: user.id, username: user.username})
    }
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      var user = db_pw.get('users').find({ username: username }).value()

      if(!user) {
        return done(null, false, { message: 'Invalid username & password.' });
      }
      if(!comparePassword(password, user.password)) {
        return done(null, false, { message: 'Invalid username & password.' });
      }
      //else, if username and password match, return the user
      return done(null, user)
    }
  ));




var server = app.listen( process.env.PORT || port, function(){
  console.log('Listening on port ' + server.address().port);
});











if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler({ log: errorNotification }))
}

function errorNotification (err, str, req) {
  var title = 'Error in ' + req.method + ' ' + req.url

  notifier.notify({
    title: "it broke",
    message: str
  })
}

