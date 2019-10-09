const express = require( 'express' ),
    app = express(),
    bodyParser = require( 'body-parser' ),
    session   = require( 'express-session' ),
    passport  = require( 'passport' ),
    Local     = require( 'passport-local' ).Strategy,
    serveStatic = require('serve-static'),
    compression = require('compression'),
    nodemailer = require('nodemailer'),
    port = 3000;

app.set('view engine', 'ejs');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low( adapter );
db.defaults({ users: [], rooms: [] }).write();

app.use( serveStatic( 'public' ) );
app.use( bodyParser.json() );
app.use( compression() );

app.use( session({ secret:'cats cats cats', resave: false, saveUninitialized: false }) );
app.use( passport.initialize() );
app.use( passport.session() );

let transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  auth: {
    user: 'wpi.meeting.notification@gmail.com',
    pass: 'meetingwpi1'
  }
});

/********** PASSPORT CONFIGURATION **********/
passport.use(new Local (
    function(username, password, done) {
        const user = db.get('users').find({ email: username }).value();

        if (!user) {
            return done(null, false, { message: 'User does not exist.'});
        }

        if (user.password !== password) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    }
));

passport.serializeUser( ( user, done ) => done( null, user.email ) );

passport.deserializeUser( ( name, done ) => {
    const user = db.get('users').find({ email: name }).value();

    if( user !== undefined ) {
        done( null, user )
    }else{
        done( null, false, { message:'user not found; session not restored' })
    }
});

/********** SERVER METHODS **********/

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/public/login.html');
});

/*** ACCOUNT METHODS ***/
app.post('/login',
    passport.authenticate('local'),
    function (request, response) { response.json({status: true})
    });

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login.html');
});

app.post('/createAccount', function (request, response) {
  const users = db.get('users')
    .filter({email: request.body.email})
    .map('name')
    .value();

  if ((users.length > 0) || (request.body.username === "")) {
    response.send(JSON.stringify({status: false}));
  } else {
    db.get('users')
      .push(request.body) // this will be an entire base user
      .write();

    response.send(JSON.stringify({status: true}));
  }
});

/*** USER METHODS ***/
app.get('/allUserInfo', function (request, response) {
  const users = db.get('users')
    .value();

  response.send(JSON.stringify({data: users}));
});

app.post('/specificUserAvailability', function (request, response) {
  const availability = db.get('users')
    .filter({email: request.body.email})
    .map('availability')
    .value();

  response.send(JSON.stringify({data: availability[0]}));
});

app.get('/currentUserInfo', function (request, response) {
  const user = db.get('users')
    .filter({email: request.session.passport.user})
    .value();

  response.send(JSON.stringify({data: user[0]}));
});

app.post('/updateUserAvailability', function (request, response) {
  db.get('users')
    .find({email: request.session.passport.user})
    .assign({availability: request.body.availability})
    .write();

  response.writeHead( 200, "OK", {'Content-Type': 'application/json' });
  response.end();
});

app.post('/updateUserArchive', function (request, response) {
  //TODO: only accept unique archive names, send 'false' in response?
  let userArchive = db.get('users')
    .filter({email: request.session.passport.user})
    .map('archive')
    .value();

  userArchive[0].push(request.body);

  db.get('users')
    .find({email: request.session.passport.user})
    .assign({archive: userArchive[0] })
    .write();

  response.writeHead( 200, "OK", {'Content-Type': 'application/json' });
  response.end();
});


/*** ROOM METHODS ***/
app.get('/allRoomInfo', function (request, response) {
  const rooms = db.get('rooms')
    .value();

  response.send(JSON.stringify({data: rooms}));
});

app.post('/specificRoomAvailability', function (request, response) {
    const availability = db.get('rooms')
        .filter({name: request.body.name})
        .map('availability')
        .value();

    response.send(JSON.stringify({data: availability[0]}));
});

app.post('/updateRoomAvailability', function (request, response) {
    const roomToUpdate = request.body;
    const roomName = roomToUpdate.name;

    db.get('rooms')
      .find({name: roomName})
      .assign({availability: roomToUpdate.availability})
      .write();

    response.writeHead( 200, "OK", {'Content-Type': 'application/json' });
    response.end();
});

app.post('/sendEmail', function (request, response) {
  const mailToSend = request.body;
  console.log(mailToSend);
  sendMail(mailToSend);
});

function sendMail(mail) {
  transporter.sendMail(mail, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: '+ info.response);
    }
  });
}

app.listen( port );
