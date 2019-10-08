const express = require('express'),
      passport = require( 'passport' ),
      LocalStrategy = require( 'passport-local' ).Strategy,
      bodyParser = require("body-parser"),
      compression = require('compression'),
      fs_service = require('./firestore_service.js'),
      favicon = require('serve-favicon'),
      path = require('path'),
      helmet = require('helmet'),
      app = express()

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('dist'));
app.use(compression({level: 1}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, '/src/media', 'favicon.jpg')));
app.use(helmet());

fs_service.init();

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/login.html');
});


app.post( '/signup', function( request, response ) {
  json = request.body;

  let username = JSON.stringify(json.username).replace(/^"(.*)"$/, '$1');
  fs_service.addNewUserProfile(username, json);

  response.writeHead( 200, { 'Content-Type': 'application/json'})
  response.end( JSON.stringify( request.body ) )
})

// listen for requests
const listener = app.listen(3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

