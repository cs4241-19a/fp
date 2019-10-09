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
      .push(request.body)
      .write();

    response.send(JSON.stringify({status: true}));
  }
});

/*** USER METHODS ***/

app.get('/currentUserMeetings', function (request, response) {
  const availability = db.get('users')
    .filter({email: request.session.passport.user})
    .map('meetings')
    .value();

  response.send(JSON.stringify({data: availability[0]}));
});

app.get('/currentUserInfo', function (request, response) {
  const user = db.get('users')
    .filter({email: request.session.passport.user})
    .value();

  response.send(JSON.stringify({data: user[0]}));
});

app.post('/updateUserMeetings', function (request, response) {
  const newMeeting = {
    name: request.body.room,
    time: [request.body.startTime, request.body.endTime]
  };

  const listOfMeetings = db.get('users')
    .filter({email: request.session.passport.user})
    .map('meetings')
    .value();

  switch(request.body.day) {
    case 'Sunday':
      listOfMeetings[0].sunday.push(newMeeting);
      break;
    case 'Monday':
      listOfMeetings[0].monday.push(newMeeting);
      break;
    case 'Tuesday':
      listOfMeetings[0].tuesday.push(newMeeting);
      break;
    case 'Wednesday':
      listOfMeetings[0].wednesday.push(newMeeting);
      break;
    case 'Thursday':
      listOfMeetings[0].thursday.push(newMeeting);
      break;
    case 'Friday':
      listOfMeetings[0].friday.push(newMeeting);
      break;
    case 'Saturday':
      listOfMeetings[0].saturday.push(newMeeting);
      break;
    default:
      break;
  }

  db.get('users')
  .find({email: request.session.passport.user})
  .assign({meetings: listOfMeetings[0]})
  .write();

  response.writeHead( 200, "OK", {'Content-Type': 'application/json' });
  response.end();
});

app.post('/deleteMeeting', function(request, response) {
  const meetingToDelete = request.body;

  // delete from user's meetings
  let userMeetings = db.get('users')
    .filter({email: request.session.passport.user})
    .map('meetings')
    .value();

  let meetingsForSelectedDay = getListForDay(request.body.day, userMeetings[0]);

  let userIndex = meetingsForSelectedDay.findIndex((meeting, i) => {
    return ((meeting.name === meetingToDelete.meeting.name) &&
      (meeting.time[0] === meetingToDelete.meeting.time[0]))
  });

  if (userIndex >= 0) {
    meetingsForSelectedDay.splice( userIndex, 1 );
  }

  switch(request.body.day) {
    case 'Sunday':
      db.get('users')
        .filter({email: request.session.passport.user})
        .assign({meetings: {sunday: meetingsForSelectedDay}})
        .write();
      break;
    case 'Monday':
      db.get('users')
        .filter({email: request.session.passport.user})
        .assign({meetings: {monday: meetingsForSelectedDay}})
        .write();
      break;
    case 'Tuesday':
      db.get('users')
        .filter({email: request.session.passport.user})
        .assign({meetings: {tuesday: meetingsForSelectedDay}})
        .write();
      break;
    case 'Wednesday':
      db.get('users')
        .filter({email: request.session.passport.user})
        .assign({meetings: {wednesday: meetingsForSelectedDay}})
        .write();
      break;
    case 'Thursday':
      db.get('users')
        .filter({email: request.session.passport.user})
        .assign({meetings: {thursday: meetingsForSelectedDay}})
        .write();
      break;
    case 'Friday':
      db.get('users')
        .filter({email: request.session.passport.user})
        .assign({meetings: {friday: meetingsForSelectedDay}})
        .write();
      break;
    case 'Saturday':
      db.get('users')
        .filter({email: request.session.passport.user})
        .assign({meetings: {saturday: meetingsForSelectedDay}})
        .write();
      break;
    default:
      break;
  }

  // parse times to delete
  const availability = db.get('rooms')
    .filter({name: request.body.meeting.name})
    .map('availability')
    .value();

  let availabilityForSelectedDay = getListForDay(request.body.day, availability[0]);


  let timesToDelete = [];

  availabilityForSelectedDay.forEach((time) => {
    // append a '0' to the beginning of the time if necessary
    const startTime = ((meetingToDelete.meeting.time[0] === "9:00") || (meetingToDelete.meeting.time[0] === "9:30")) ? "0"+meetingToDelete.meeting.time[0] : meetingToDelete.meeting.time[0];
    const endTime = meetingToDelete.meeting.time[1];
    time = ((time === "9:00") || (time === "9:30")) ? "0"+time : time;

    if ((time === startTime) ||
      ((time < endTime) && (time > startTime))) {

      let roomIndex = availabilityForSelectedDay.findIndex((iTime, i) => {
        iTime = ((iTime === "9:00") || (iTime === "9:30")) ? "0"+iTime : iTime;
        return (iTime === time)
      });

      if (roomIndex >= 0) {
        timesToDelete.unshift(roomIndex);
      }
    }
  });

  timesToDelete.forEach((index) => {
    availabilityForSelectedDay.splice(index, 1);
  });

  switch(request.body.day) {
    case 'Sunday':
      db.get('rooms')
        .filter({name: request.body.meeting.name})
        .assign({availability: {sunday: availabilityForSelectedDay}})
        .write();
      break;
    case 'Monday':
      db.get('rooms')
        .filter({name: request.body.meeting.name})
        .assign({availability: {monday: availabilityForSelectedDay}})
        .write();
      break;
    case 'Tuesday':
      db.get('rooms')
        .filter({name: request.body.meeting.name})
        .assign({availability: {tuesday: availabilityForSelectedDay}})
        .write();
      break;
    case 'Wednesday':
      db.get('rooms')
        .filter({name: request.body.meeting.name})
        .assign({availability: {wednesday: availabilityForSelectedDay}})
        .write();
      break;
    case 'Thursday':
      db.get('rooms')
        .filter({name: request.body.meeting.name})
        .assign({availability: {thursday: availabilityForSelectedDay}})
        .write();
      break;
    case 'Friday':
      db.get('rooms')
        .filter({name: request.body.meeting.name})
        .assign({availability: {friday: availabilityForSelectedDay}})
        .write();
      break;
    case 'Saturday':
      db.get('rooms')
        .filter({name: request.body.meeting.name})
        .assign({availability: {saturday: availabilityForSelectedDay}})
        .write();
      break;
    default:
      break;
  }

  response.writeHead( 200, "OK", {'Content-Type': 'application/json' });
  response.end();
});

function getListForDay(day, listOfTimes) {
  let timesForSelectedDay;

  switch(day) {
    case 'Sunday':
      timesForSelectedDay = listOfTimes.sunday;
      break;
    case 'Monday':
      timesForSelectedDay = listOfTimes.monday;
      break;
    case 'Tuesday':
      timesForSelectedDay = listOfTimes.tuesday;
      break;
    case 'Wednesday':
      timesForSelectedDay = listOfTimes.wednesday;
      break;
    case 'Thursday':
      timesForSelectedDay = listOfTimes.thursday;
      break;
    case 'Friday':
      timesForSelectedDay = listOfTimes.friday;
      break;
    case 'Saturday':
      timesForSelectedDay = listOfTimes.saturday;
      break;
    default:
      break;
  }
  return timesForSelectedDay;
}

/*** ROOM METHODS ***/
app.get('/allRoomInfo', function (request, response) {
  const rooms = db.get('rooms')
    .value();

  response.send(JSON.stringify({data: rooms}));
});

app.post('/specificRoomAvailability', function (request, response) {
  if (request.session.passport) {
    const availability = db.get('rooms')
      .filter({name: request.body.name})
      .map('availability')
      .value();

    response.send(JSON.stringify({data: availability[0]}));
  } else {
    response.send(JSON.stringify({data: null}));
  }
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
