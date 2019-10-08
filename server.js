const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let budgets = [
    {
        "id": 1,
        "name": "Cheese Club",
        "requested": 3000,
        "approved": 2500
    },
    {
        "id": 2,
        "name": "Soccomm Movies",
        "requested": 4500,
        "approved": 4500
    },
    {
        "id": 3,
        "name": "Ski Club",
        "requested": 3600,
        "approved": 3300
    },
    {
        "id": 4,
        "name": "Women In ECE",
        "requested": 400,
        "approved": 300
    },
];

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
    // Remember to add id as props when doing mysql, I want array syntax, but efficiency of a map/object
    res.json({budgets: budgets});
});

app.post('/api/addBudget', (req, res) => {
    console.log(`Adding budget for ${req.body.name}`)
    req.body.id = budgets.length;
    budgets.push(req.body);
    res.send(true);
});

/**
 * HOW TO USE in react - Use home - handleSubmit as an example
 * const response = await fetch('/api/editBudget', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: { name, requested, etc. }}),
        });
    const edited = await response;
    if(edited) {
        // Call home again to update all the data
    }
 */
app.post('/api/editBudget', (req, res) => {
    let index = Object.keys(req.body);
    budgets[index] = req.body[index];
    res.send(true);
});

/**
 * HOW TO USE in react - Use home - handleSubmit as an example
 * const response = await fetch('/api/deleteBudget', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ index: index }),
        });
    const deleted = await response;

    if(deleted) {
        // Call home again to update all the data
    }
 */
app.post('/api/deleteBudget', function (req, res) {
    let index = parseInt(req.body.index);
    let isDeleted = delete budgets[index];
    res.send(isDeleted);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + './build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));