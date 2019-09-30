const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();

app.use(bodyParser.json());
app.use(compression());
app.use(express.static('dist'));

const listener = app.listen(process.env.PORT, function() {
	console.log('Your app is running. Go to http://localhost:' + listener.address().port + '/index.html');
});
