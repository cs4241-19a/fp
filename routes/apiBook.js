var express = require('express');
var path = require('path');
var router = express.Router();

/* ### DB QUERIES ### */
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test@cluster0-k0fe1.mongodb.net/admin?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

// adds a book to the book database, assigning the user adding it as an owner
function dbBookAdd(username, name, crn) {
    console.log("adding new book to the database...");

    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://test:test@cluster0-k0fe1.mongodb.net/admin?retryWrites=true&w=majority";

    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("finalproject");
        var myobj = { username: username, name: name, crn: crn};
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
                        })
                    }
                    catch(e) {
                        console.log(e)
                    }
                    client.close();
                }
                else if(isCRN) {
                    try {
                        MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
                            const db = client.db('finalproject');
                            resolve(db.collection('books').find({crn: arr[0]}).toArray())
                        })
                    }
                    catch(e) {
                        console.log(e)
                    }
                    client.close();
                }
            }
            else if(arr.length == 2) {
                try {
                    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
                        const db = client.db('finalproject');
                        resolve(db.collection('books').find({name: arr[0], crn: arr[1]}).toArray())
                    })
                }
                catch(e) {
                    console.log(e)
                }
                client.close();
            }
            else {
                reject(Error("invalid!"))
            }
        }, 100)
    })
};

// after an exchange is completed adds book to new user while removing it from previous
// array should be [prevOwner, newOwner, bookName, crn]
function dbBookChangeOwner(prevOwner, newOwner, bookName, crn) {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://test:test@cluster0-k0fe1.mongodb.net/admin?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    try {
        MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
            const db = client.db('finalproject');
            db.collection('books').update({username: prevOwner, name: bookName, crn: crn}, {$set: {username: newOwner}})
        })
    }
    catch(e) {
        console.log(e)
    }
    client.close();
}

// get all books from db
let dbBookGetAll = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
                    const db = client.db('finalproject');
                    resolve(db.collection('books').find({}).toArray())
                })
            }
            catch(e) {
                console.log(e)
            }
            client.close();
        }, 100)
    })
};

// get all books from a user
let dbBookGetFromUser = function(arr) {
    console.log("getbookuser")
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
                    const db = client.db('finalproject');
                    resolve(db.collection('books').find({username: arr[0]}).toArray())
                })
            }
            catch(e) {
                console.log(e)
            }
            client.close();
        }, 100)
    })
};

// /* ### ROUTES ### */
router.post('/addBook', function (req, res) {
    console.log("attempting to add new book...");
    const username = req.body.username; // going to have to change this to get it from cookie probably
    const bookName = req.body.name;
    const crn = req.body.crn;

    dbBookAdd(username, bookName, crn);
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

router.post('/exchangeBook', function(req, res) {
    console.log("exchanging book...");
    const prevOwner = req.body.curOwner;
    const newOwner = req.body.newOwner;
    const bookName = req.body.name;
    const crn = req.body.crn;

    dbBookChangeOwner(prevOwner, newOwner, bookName, crn)
});

router.post('/getBooks', function (req,res){
    console.log("getting all books...");
    dbBookGetAll().then(data => {
        res.send(data)
    }).catch(e => {
        console.log(e)
    })
});

router.post('/getBooksFromUser', function(req, res) {
    console.log(req.body.username)
    const username = req.body.username;
    console.log("getting books from user " + username + "...");

    dbBookGetFromUser([username]).then(data => {
        res.send(data)
    }).catch(e => {
        console.log(e)
    })
});

module.exports = router;