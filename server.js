const express = require('express'),
  session = require('express-session'),
  app = express(),
  bodyParser = require('body-parser'),
  helmet = require('helmet'),
  compression = require('compression'),
  low = require("lowdb"),
  FileSync = require("lowdb/adapters/FileSync"),
  passport = require('passport'),
  Local = require('passport-local').Strategy,
  port = 3000;

let credentials = null

// automatically deliver all files in the public folder
// with the correct headers / MIME type.
app.use(express.static('public'));

// middleware
app.use(helmet());
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(compression());
app.use(bodyParser.json());

const myLocalStrategy = function (username, password, done) {
  const user = db.get('users').value().find(__user => __user.username === username)
  if (user === undefined) {
    return done(null, false, { message: 'user not found' })
  }
  else if (user.password === password) {
    credentials = username
    return done(null, { username, password })
  }
  else {
    return done(null, false, { message: 'incorrect password' })
  }
}

passport.use('local-login', new Local(myLocalStrategy))

passport.initialize()

passport.serializeUser((user, done) => done(null, user.username))

passport.deserializeUser((username, done) => {
  const user = db.get('users').find(u => u.username === username)
  console.log('deserializing:', username)

  if (user !== undefined) {
    done(null, user)
  } else {
    done(null, false, { message: 'user not found; session not restored' })
  }
})

app.use(session({ secret: 'cats cats cats', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.post('/test', function (req, res) {
  console.log('authenticate with cookie?', req.user)
  res.json({ status: 'success' })
})

app.get('/currentUser', function (req, res) {

  res.send(JSON.stringify(db.get('users').find({ username: credentials }).value()))
})

app.get('/getAdmin', function (req, res) {
  
  const user = db.get('users').find({username: credentials}).value()
  console.log(user)
  console.log(user.key)
  const apartment = db.get('apartments').find({key: user.key}).value()
  console.log(apartment)
  const admin = db.get('users').find({ username: apartment.landlord }).value()
  console.log(admin)
  res.send(JSON.stringify(db.get('users').find({ username: apartment.landlord }).value()))
})

app.get('/getRoommates', function (req, res) {

  const user = db.get('users').find({username: credentials}).value()
  const apartment = db.get('apartments').find({key: user.key}).value()
  const roommates = db.get('users').filter({key: apartment.key}).value()
  console.log(roommates)
  res.send(JSON.stringify(roommates))
})

app.get('/getUsers', function (req, res) {
  res.send(JSON.stringify(db.get('users').value()))
})


//Calendar for Landlord
app.get('/getEventslandlord', function(req, res){
  const apartments = db.get('apartments').filter({landlord: credentials}).value()
  let eventList = []
  for(let apt of apartments){
    eventList = eventList.concat(db.get('events').filter({apt: apt.key}).value())
  }
  res.send(JSON.stringify(eventList))
})
app.get('/getPaylandlord', function(req, res){
  const apartments = db.get('apartments').filter({landlord: credentials}).value()
  let paylist = []
  for(let apt of apartments){
    paylist = paylist.concat(db.get('payments').filter({apt: apt.key}).value())
  }
  res.send(JSON.stringify(paylist))
})
app.get('/getServicelandlord', function(req, res){
  const apartments = db.get('apartments').filter({landlord: credentials}).value()
  let servicelist = []
  for(let apt of apartments){
    servicelist = servicelist.concat(db.get('services').filter({apt: apt.key}).value())
  }
  res.send(JSON.stringify(servicelist))
})

//Calendar for Tenants
app.get('/getEventsTenant', function(req, res){
  let user = db.get('users').find({username: credentials}).value()
  console.log(user.key)
  let eventList = db.get('events').filter({apt: user.key}).value()
  console.log(eventList)
  res.send(JSON.stringify(eventList))
})
app.get('/getPayTenant', function(req, res){
  const user = db.get('users').find({username: credentials}).value()
  let paylist = db.get('payments').filter({apt: user.key}).value()
  res.send(JSON.stringify(paylist))
})
app.get('/getServiceTenant', function(req, res){
  const user = db.get('users').find({username: credentials}).value()
  const servicelist = db.get('services').filter({apt: user.key}).value()
  res.send(JSON.stringify(servicelist))
})

//TenantPayment
app.get('/payments', function (req, res) {
  // res.send(JSON.stringify(db.get('payments').filter({ key:req.body }).values()))
  const k = db.get('users').find({username:credentials}).value().key
  const payment = db.get('payments').filter({apt: k}).value()
  console.log(payment)
  res.send(JSON.stringify(payment))
})

//getDates
app.get('/getDatesTenant', function (req, res) {
  const user = db.get('users').find({username: credentials}).value()
  const eventlist = db.get('events').filter({apt: user.key}).value()
  const servicelist = db.get('services').filter({apt: user.key}).value()
  const paylist = db.get('payments').filter({apt: user.key}).value()

  let dateList = [];
  for(let event of eventlist){
    if(!dateList.includes(event.day)) {
      dateList.push(event.day)
    }
  }
  for(let ser of servicelist){
    if(!dateList.includes(ser.date)) {
      dateList.push(ser.date)
    }
  }
  for(let pay of paylist){
    if(!dateList.includes(pay.due)) {
      dateList.push(pay.due)
    }
  }
  console.log(dateList)
  res.send(JSON.stringify(dateList))
})

app.get('/getDatesLandlord', function (req, res) {
  const apartments = db.get('apartments').filter({landlord: credentials}).value()
  let eventList = []
  let servicelist = []
  let paylist = []
  for(let apt of apartments){
    eventList = eventList.concat(db.get('events').filter({apt: apt.key}).value())
    servicelist = servicelist.concat(db.get('services').filter({apt: apt.key}).value())
    paylist = paylist.concat(db.get('payments').filter({apt: apt.key}).value())
  }

  let dateList = [];
  for(let event of eventList){
    if(!dateList.includes(event.day)) {
      dateList.push(event.day)
    }
  }
  for(let ser of servicelist){
    if(!dateList.includes(ser.date)) {
      dateList.push(ser.date)
    }
  }
  for(let pay of paylist){
    if(!dateList.includes(pay.due)) {
      dateList.push(pay.due)
    }
  }
  console.log(dateList)
  res.send(JSON.stringify(dateList))
})

// domain views index.html
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
  response.send('hello, world!');
});


// connect to db
const adapter = new FileSync("database.json")
const db = low(adapter)
db.defaults({ users: [], apartments: [], keycount: 1 }).write()

app.get('/getApartments', function(req, res){
  let aptlist = db.get('apartments').filter({landlord: credentials}).values()
  res.send(JSON.stringify(aptlist))
})


app.post("/signUp", (req, res) => {
  let user = db.get("users").filter({ username: req.body.username })
  console.log(user.value().length)
  if (user.value().length === 0) {
    db.get('users').push(req.body).write()
    res.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
    res.end()
  }
  else {
    res.writeHead(422, "User Exists", { 'Content-Type': 'text/plain' })
    res.end()
  }
})


app.post("/addEvent", (req, res) => {
  let event = db.get("events").filter({ eventid: req.body.eventid})
  console.log(event.value().length)
  if(event.value().length === 0){
    db.get('events').push(req.body).write()

    res.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    res.end()
  }
  else{
    res.writeHead( 422, "Event Exists", {'Content-Type': 'text/plain' })
    res.end()
  }
})

app.post("/addPayment", (req, res) => {
  let payment = db.get("payments").filter({ paymentid: req.body.paymentid })
  console.log(payment.value().length)
  if (payment.value().length === 0) {
    db.get('payments').push(req.body).write()

    res.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
    res.end()
  }
  else {
    res.writeHead(422, "Payment Exists", { 'Content-Type': 'text/plain' })
    res.end()
  }
})

app.post("/addService", (req, res) => {
  let service = db.get("services").filter({ serviceid: req.body.serviceid })
  console.log(service.value().length)
  if (service.value().length === 0) {
    db.get('services').push(req.body).write()

    res.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
    res.end()
  }
  else {
    res.writeHead(422, "Service Exists", { 'Content-Type': 'text/plain' })
    res.end()
  }
})


app.post('/login',
  passport.authenticate('local-login', {}),
  function (req, res) {
    let user = db.get('users').find({ username: req.body.username })
    let type = user.value().userType
    res.end(JSON.stringify(type))
    // console.log('login works')
    // res.redirect('/');
    // console.log('hi')
    // if(user.userType === "landlord") {
    //   let get_apts = db.get('apartments').filter({ landlord: req.body.username });
    //   console.log(get_apts);
    // }
  }
);

app.post('/addApartment', function (request, response) {
  dataString = ''

  request.on('data', function (data) {
    dataString += data
  })

  request.on('end', function () {
    var apartment = JSON.parse(dataString)
    var address = (apartment.address)
    var key = db.get('keycount').value()
    var landlord = (apartment.landlord)

    obj = { address: address, key: key, landlord: landlord }
    console.log(obj)

    db.get('apartments')
      .push(obj)
      .write()

    // increment keycount
    db.update('keycount', n => n + 1)
      .write()

    response.writeHead(200, "OK", { 'Content-Type': 'application/json' })
    response.end()
  })
})

// POST update profile
app.post( '/updateProfile', function( request, response ) {
  dataString = ''
  
  request.on( 'data', function( data ) {
    dataString += data
  })

  request.on( 'end', function() {

    var updatedata = JSON.parse(dataString)
    var firstName = (updatedata.firstName)
    var lastName = (updatedata.lastName)
    var phone = (updatedata.phone)
    var email = (updatedata.email)
    var username = (updatedata.username)

    db.get('users')
      .find({username: username})
      .assign({ first: firstName, last: lastName, phone: phone, email: email}) 
      .write()

    response.writeHead( 200, "OK", {'Content-Type': 'application/json' })
    response.end()
  })
})

app.get('/getServices', function(req,res) {
  res.send(JSON.stringify(db.get('services').filter({}).values()))
})

app.listen(process.env.PORT || port, process.env.IP, () => {
  console.log("Server is listening on port ", process.env.PORT || port, "...");
});
