const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();

// Force HTTPS
app.use((req, res, next) => {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
});

app.use(bodyParser.json());
app.use(compression());
app.use(express.static('dist'));

// Setup socket.io
const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('./socket.js')(io);

const listener = http.listen(process.env.PORT, function() {
	console.log('Your app is running. Go to http://localhost:' + listener.address().port + '/index.html');
});
