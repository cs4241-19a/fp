// server.js
// where your node app starts

// init project
const PORT = 3000;
const express = require('express');
const app = express();
const path = require('path');


// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

app.use(express.static('public'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT || PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});