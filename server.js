const express = require('express'),
      bodyParser = require("body-parser"),
      compression = require('compression'),
      fs_service = require('./firestore_service.js'),
      app = express()

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('dist'));
app.use(compression({level: 1}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

fs_service.init();

//TODO: Set to main.html for testing purposes, change to login.html for prod 
//behavior
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/main.html');
});

// listen for requests
const listener = app.listen(3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

