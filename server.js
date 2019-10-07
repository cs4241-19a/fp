const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "fp"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(express.static(path.join(__dirname, './build')));


app.get('/api/hello', (req, res) => {
    con.query("SELECT * FROM accounts;", function (err, data) {
        (err) ? res.send(err) : res.json({ users: data });
    })
});

app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

app.get('/api/home', (req, res) => {
    res.json({
        1: {
            "name": "Cheese Club",
            "requested": 3000,
            "approved": 2500
        },
        2: {
            "name": "Soccomm Movies",
            "requested": 4500,
            "approved": 4500
        },
        3: {
            "name": "Ski Club",
            "requested": 3600,
            "approved": 3300
        },
        4: {
            "name": "Women In ECE",
            "requested": 400,
            "approved": 300
        },
    })
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + './build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));