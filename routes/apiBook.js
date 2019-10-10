var express = require('express');
var path = require('path');
var router = express.Router();

/* ### DB QUERIES ### */
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test@cluster0-k0fe1.mongodb.net/admin?retryWrites=true&w=majority";

// adds a book to the book database, assigning the user adding it as an owner
function dbBookAdd(username, name, crn, location) {
    console.log("adding new book to the database...");
    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("finalproject");
        var myobj = { username: username, name: name, crn: crn, location: location };
        dbo.collection("books").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("added new book!");
            db.close();
        });
    });
}

// check if someone has the book and who owns it
// should it just return 1 object or all possibilities?
// should take in [bookName], [crn], or [bookName, crn]
let dbBookLookup = function(arr) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(arr.length == 1) {
                var isBookName = false;
                var isCRN = false;

                if(typeof arr[0] == "number") {
                    isCRN = true
                }
                else {
                    isBookName = true
                }
                if(isBookName) {
                    try {
                        MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
                            const db = client.db('finalproject');
                            resolve(db.collection('books').find({name: arr[0]}).toArray())
                            client.close();
                        })
                    }
                    catch(e) {
                        console.log(e)
                    }
                }
                else if(isCRN) {
                    try {
                        MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
                            const db = client.db('finalproject');
                            resolve(db.collection('books').find({crn: arr[0]}).toArray())
                            client.close();
                        })
                    }
                    catch(e) {
                        console.log(e)
                    }
                }
            }
            else if(arr.length == 2) {
                try {
                    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
                        const db = client.db('finalproject');
                        resolve(db.collection('books').find({name: arr[0], crn: arr[1]}).toArray())
                        client.close();
                    })
                }
                catch(e) {
                    console.log(e)
                }
            }
            else {
                reject(Error("invalid!"))
            }
        }, 100)
    })
};

// delete book given username, bookName, and crn
function dbBookDeleteBook(username, bookName, crn) {
    try {
        MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
            const db = client.db('finalproject');
            db.collection('books').deleteOne({username: username, name: bookName, crn: crn})
            client.close();
        })
    }
    catch(e) {
        console.log(e)
    }
}

// get all books from db
let dbBookGetAll = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
                    const db = client.db('finalproject');
                    resolve(db.collection('books').find({}).toArray())
                    client.close();
                })
            }
            catch(e) {
                console.log(e)
            }
        }, 100)
    })
};

// edit baby book boy
// array should be [ _id, bookName, crn ]
let dbBookEdit = function(arr) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
                    const db = client.db('finalproject');
                        resolve(db.collection('books').updateOne({ _id: arr[0] }, {$set: {name: arr[1], crn: arr[2]}}).toArray())
                    client.close();
                })
            }
            catch(e) {
                console.log(e)
            }
        }, 100)
    })
};

// get all books from a user
let dbBookGetFromUser = function(arr) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
                    const db = client.db('finalproject');
                    resolve(db.collection('books').find({username: arr[0]}).toArray())
                    client.close();
                })
            }
            catch(e) {
                console.log(e)
            }
        }, 100)
    })
};

// /* ### ROUTES ### */
router.post('/addBook', function (req, res) {
    console.log("adding new book...");
    const username = req.body.username; // going to have to get this from cookie
    const bookName = req.body.name;
    const crn = req.body.crn;
    const location = req.body.location;

    dbBookAdd(username, bookName, crn, location);
    res.cookie('username', username);
    res.send("OK");
});

router.post('/searchBook', function(req, res) {
    console.log("searching for book...");
    // going to have to figure out what we are using to search for the book
    const bookName = req.body.name;
    const crn = req.body.crn;
    const bookInfo = [bookName, crn];

    dbBookLookup(bookInfo).then(data => {
        res.send(data)
    }).catch(e => {
        console.log(e)
    })
});

router.post('/deleteBook', function(req, res) {
    console.log("exchanging book...");
    const username = req.body.username;
    const bookName = req.body.name;
    const crn = req.body.crn;

    dbBookDeleteBook(username, bookName, crn)
});

router.post('/getBooks', function (req,res){
    console.log("getting all books...");
    dbBookGetAll().then(data => {
        res.send(data)
    }).catch(e => {
        console.log(e)
    })
});

router.post('/editBook', function (req,res){
    console.log("editing book...");
    const id = req.body._id;
    const bookName = req.body.name;
    const crn = req.body.crn;

    dbBookEdit([id, bookName, crn]).then(data => {
        res.send(data)
    }).catch(e => {
        console.log(e)
    })
});

router.post('/getBooksFromUser', function(req, res) {
    const username = req.body.username;
    console.log("getting books from user " + username + "...");

    dbBookGetFromUser([username]).then(data => {
        res.send(data)
    }).catch(e => {
        console.log(e)
    })
});

router.post('/deleteBooks', function(req, res) {
    console.log("deleting all books!")
    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("finalproject");
        var myobj = {};
        dbo.collection("books").deleteMany(myobj, function(err, res) {
            if (err) throw err;
            db.close();
        });
    });
});


module.exports = router;