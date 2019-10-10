// server.js
// where your node app starts

// init project
const express = require('express'),
      sqlite3 = require('sqlite3').verbose(),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      Local = require('passport-local').Strategy,
      session = require('express-session'),
      cookieParser = require('cookie-parser'),
      low = require('lowdb'),
      FileSync = require('lowdb/adapters/FileSync'),
      helmet = require('helmet'),
      mtg = require('mtgsdk'),
      reload = require('reload'),
      app = express();

// Below is the commeted sectio of the code used to attempt to conect woth mongo db

// var credential = ''
// mongoose.connect("mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+'/'+process.env.DB", { useNewUrlParser: true })
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {

//   var userSchema = new mongoose.Schema({
//     username: String,
//     password: String,
//   });

//   var User = mongoose.model('User', userSchema);

//   passport.serializeUser((user, done) => {
//     done(null, user.username)
//   })

//   // "name" below refers to whatever piece of info is serialized in seralizeUser,
//   // in this example we're using the username
//   passport.deserializeUser((username, done) => {
//     var query = User.where({ username: username });

//     query.findOne(function (err, user) {
//       if (err) return handleError(err);
//       if (user) {
//         credential = username
//         done(null, user)
//       }
//     });
//   })

const userAdapter = new FileSync('users.json');
const userdb = low(userAdapter);
let credential = '';

passport.serializeUser( ( user, done ) => {
    done( null, user.username ) 
})

passport.deserializeUser( ( username, done ) => {
  const user = userdb.find( u => u.username === username ).value()
  credential = username
  
  if( user !== undefined ) {
    done( null, user )
  }else{
    done( null, false, { message:'user not found; session not restored' })
  }
})

app.use(helmet())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// console.log( '#'+Math.floor(Math.random()*167772153298472234).toString(16) )

// http://expressjs.com/en/starter/static-files.html
app.use(cookieParser());
app.use(require('express-session')({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

userdb.defaults({ users: [] })
  .write();

// //--------------------------------------------------------------------------------------//

// Create dB

// //--------------------------------------------------------------------------------------//
 
// open database in memory
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
  
});

const test_deck = [{'user': 'Andrew', 'quantity': 2, 'card_name': 'Ugin, the Spirit Dragon', 'set_name': 'FRF'},
 {'user': 'Andrew', 'quantity': 4, 'card_name': 'Thirst for Knowledge', 'set_name': 'MRD'},
 {'user': 'Andrew', 'quantity': 2, 'card_name': 'Wurmcoil Engine', 'set_name': 'SOM'},
 {'user': 'Andrew', 'quantity': 2, 'card_name': 'Remand', 'set_name': 'RAV'},
 {'user': 'Andrew', 'quantity': 3, 'card_name': 'Repeal', 'set_name': 'GPT'},
 {'user': 'Andrew', 'quantity': 4, 'card_name': 'Elvish Mystic', 'set_name': 'M14'},
 {'user': 'Andrew', 'quantity': 2, 'card_name': 'Platinum Angel', 'set_name': 'CN2'},
 {'user': 'Andrew', 'quantity': 5, 'card_name': 'Island', 'set_name': '8E'},
 {'user': 'Andrew', 'quantity': 4, 'card_name': 'Dark Confidant', 'set_name': 'RAV'},
 {'user': 'Andrew', 'quantity': 4, 'card_name': 'Expedition Map', 'set_name': 'ZEN'},
 {'user': 'Andrew', 'quantity': 2, 'card_name': 'Thunderbreak Regent', 'set_name': 'DTK'},
 {'user': 'Andrew', 'quantity': 3, 'card_name': 'Fumigate', 'set_name': 'KLD'}];

const insertdb = function (user, quan, c_name, s_name, cmc, colors) {
  console.log(colors)
  if (colors === undefined || colors.length == 0) {
    colors.push('Colorless')
  }
  console.log(colors)
  var stmt = db.prepare("INSERT INTO deck_list VALUES ('" + user + "'," + quan + ",'" + c_name + "','" + s_name + "'," + cmc + ",'" + colors[0] + "')")
  stmt.run()
  stmt.finalize()
  colors.forEach(function (color) {
    //console.log(color)
    var stmt = db.prepare("INSERT INTO color_list VALUES ('" + user + "','" + c_name + "','" + color + "')")
    stmt.run()
    stmt.finalize()
  }).then(function () { reload(app) } )
}

const initdb = function () {
  test_deck.forEach(function (test_card) {
    mtg.card.all({ name: test_card.card_name , set: test_card.set_name })
      .on('data', card => {
        var cmc = card.cmc
        var colors = card.colors
        // console.log(String(test_card.user))
        // console.log(test_card.quantity)
        // console.log(test_card.card_name)
        insertdb(test_card.user, test_card.quantity, test_card.card_name, test_card.set_name, cmc, colors);
    })
  })
}

db.serialize(function () {
  db.run('CREATE TABLE deck_list (user TEXT, quantity INTEGER, card_name TEXT, set_name TEXT, cmc INTERGER, color TEXT)');
  db.run('CREATE TABLE color_list (user TEXT, card_name TEXT, color TEXT)');
  initdb();
  // var stmt = db.prepare("INSERT INTO deck_list VALUES ('Andrew', 2, 'Ugin, the Spirit Dragon', 'FRF')");
  // stmt.run()
  // var stmt = db.prepare("INSERT INTO deck_list VALUES ('Hand', 1, 'Mind Slaver', 'Mirrodan')");
  // stmt.run()
  // stmt.finalize()
  
})

 
// // close the database connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
 
app.get('/index.html', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// all authentication requests in passwords assume that your client
// is submitting a field named "username" and field named "password".
// these are both passed as arugments to the authentication strategy.
const myLocalStrategy = function( username, password, done ) {
    // find the first item in our users array where the username
    // matches what was sent by the client. nicer to read/write than a for loop!
    const user = userdb.get( 'users' )
                       .find({ username: username})
                       .value()
    
    // if user is undefined, then there was no match for the submitted username
    if( user === undefined ) {
      /* arguments to done():
       - an error object (usually returned from database requests )
       - authentication status
       - a message / other data to send to client
      */
     console.log('user not found')
      return done( null, false, { message:'user not found' })
    }else if( user.password === password ) {
      // we found the user and the password matches!
      // go ahead and send the userdata... this will appear as request.user
      // in all express middleware functions.
      console.log('user found')
      return done( null, { username, password })
    }else{
      // we found the user but the password didn't match...
      console.log('password not found')
      return done( null, false, { message: 'incorrect password' })
    }
}
passport.use(new Local(myLocalStrategy))

app.get('/redirect-login', (request, response) => response.sendFile(__dirname + '/views/login.html'));
app.get('/redirect-signup', (request, response) => response.sendFile(__dirname + '/views/signup.html'));
app.post('/signout', function(request, response) {
    request.session.destroy()
    credential = ''
    response.redirect('/redirect-login')
    response.end()
});
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/redirect-login'
}),
    function (request, response) {
        response.json({ status: true })
    }
  )
app.post('/signup', function(request, responce) {
  const body = request.body
  let userAttempt = body.username
  let passAttempt = body.password

  // Add a post
  userdb.get('users')
    .push({ username: userAttempt, password: passAttempt })
    .write()

  responce.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
  responce.end()
})


// //--------------------------------------------------------------------------------------

// Read, write, modify database using the following expressions

// //--------------------------------------------------------------------------------------
// let rows = [];
// app.get('/read', function(request, response) {
//   db.each(
//     "SELECT quantity, card_name, set_name FROM deck_list WHERE user = '" + credential + "'",
//     function(err, row) {
//       mtg.card.all({ name: row.card_name , set: row.set_name })
//         .on('data', card => {
//             var new_row = {"quantity": row.quantity, "card_name": row.card_name, "set_name": row.set_name, "colors": null, "cmc": null};
//             new_row.colors = card.colors;
//             new_row.cmc = card.cmc;
//             rows.push(new_row);
//             console.log(rows);
//         })
//     },
//     function() {
//       response.end( JSON.stringify(rows) );
//     }
//   )
// });

// app.get('/read', function(request, response) {
//   var rows = [];
//   db.each(
//     "SELECT quantity, card_name, set_name FROM deck_list WHERE user = '" + credential + "'",
//     function(err, row) {
//       mtg.card.all({ name: row.card_name , set: row.set_name })
//         .on('data', card => {
//           row.colors = card.colors;
//           row.cmc = card.cmc;
//           rows.push(row);
//           response.end( JSON.stringify(rows) );
//       })
//     }
//   )
// });

// const get_color = function (card_name) {
//   console.log(card_name)
//   console.log(credential)
//   db.each(
//     "SELECT color FROM color_list WHERE user = '" + credential + "' AND card_name = '" + card_name + "'",
//     function(err, add_row) {
//       console.log(add_row);
//     }
//   )
// }

app.get('/read', function(request, response) {
  var rows = []
  //var card_name = 'Thirst for Knowledge';
  db.each(
    "SELECT quantity, card_name, set_name, cmc, color FROM deck_list WHERE user = '" + credential + "'",
    //"SELECT color FROM color_list WHERE user = '" + credential + "' AND card_name = '" + card_name + "'",
    function(err, row) {
      // row.colors = []
      // db.each(
      //   "SELECT color FROM color_list WHERE user = '" + credential + "' AND card_name = '" + row.card_name + "'",
      //   function(err, add_row) {
      //     console.log(add_row);
      //     row.colors.push(add_row.color);
      //     console.log(row); 
      //   }
      // )
      //console.log(row);
      rows.push(row); 
    },
    function() { response.end( JSON.stringify(rows) ) }
  )
});



app.post('/update', function(request, response) {
  // response.sendFile(__dirname + '/views/index.html');
  console.log(request.body);
  let quantity = request.body['quantity'],
      card_name = request.body['card_name'],
      set_name = request.body['set_name'];
  db.run("UPDATE deck_list SET quantity = " + quantity + " WHERE card_name = '" + card_name + "' AND set_name = '" + set_name + "' AND user = '" + credential + "'");
});

const find_dets = function (credential, quantity, card_name, set_name) {
  mtg.card.all({ name: card_name , set: set_name })
      .on('data', card => {
        var cmc = card.cmc
        var colors = card.colors
        // console.log(String(test_card.user))
        // console.log(test_card.quantity)
        // console.log(test_card.card_name)
        insertdb(credential, quantity, card_name, set_name, cmc, colors);
    })
}

app.post('/add', function(request, response) {
  // response.sendFile(__dirname + '/views/index.html');
  console.log(request.body)
  let quantity = request.body['quantity'],
      card_name = request.body['card_name'],
      set_name = request.body['set_name'];
  // console.log(quantity);
  // console.log(card_name);
  // console.log(set_name);
  //db.run("INSERT INTO deck_list VALUES ('" + credential + "',"+ quantity + ",'" + card_name + "','" + set_name + "')");
  // mtg.card.all({ name: card_name , set: set_name })
  //     .on('data', card => {
  //       var cmc = card.cmc
  //       var colors = card.colors
  //       // console.log(String(test_card.user))
  //       // console.log(test_card.quantity)
  //       // console.log(test_card.card_name)
  //       console.log('Im back bb')
  //       insertdb(credential, quantity, card_name, set_name, cmc, colors);
  //   })
  find_dets(credential, quantity, card_name, set_name)
});

app.put('/delete', function(request, response) {
  let card_name = request.body['card_name'],
      set_name = request.body['set_name'];
  db.run("DELETE FROM deck_list WHERE card_name = '"+ card_name + "' AND set_name = '" + set_name + "' AND user = '" + credential + "'");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
