const express = require('express'),
      bodyParser = require("body-parser"),
      compression = require('compression'),
      fs_service = require('./firestore_service.js'),
      favicon = require('serve-favicon'),
      path = require('path'),
      app = express()

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('dist'));
app.use(compression({level: 1}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, '/src/media', 'favicon.jpg')));

fs_service.init();

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/login.html');
});

// listen for requests
const listener = app.listen(3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

