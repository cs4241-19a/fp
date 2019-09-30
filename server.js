const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());

app.use(express.static('public'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

app.listen(3000);
console.log('Your app is listening on port 3000');
