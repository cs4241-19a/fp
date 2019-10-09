var express = require("express");
var path = require("path");
var router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://test:test@cluster0-k0fe1.mongodb.net/admin?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

// adds a book to the book database, assigning the user adding it as an owner
function dbBookAdd(username, name, crn) {
  console.log("adding new book to the database...");

  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://test:test@cluster0-k0fe1.mongodb.net/admin?retryWrites=true&w=majority";

  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("finalproject");
    var myobj = { username: username, name: name, crn: crn };
    dbo.collection("books").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("added new book!");
      db.close();
    });
  });
  return;
}

// check if someone has the book and who owns it
// should it just return 1 object or all possibilities?
// should take in [bookName], [crn], or [bookName, crn]
let dbBookLookup = function(arr) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (arr.length == 1) {
        var isBookName = false;
        var isCRN = false;

        if (typeof arr[0] == "number") {
          isCRN = true;
        } else {
          isBookName = true;
        }
        if (isBookName) {
          try {
            MongoClient.connect(uri, { useNewUrlParser: true }, function(
              err,
              client
            ) {
              const db = client.db("finalproject");
              resolve(
                db
                  .collection("books")
                  .find({ name: arr[0] })
                  .toArray()
              );
            });
          } catch (e) {
            console.log(e);
          }
          client.close();
        } else if (isCRN) {
          try {
            MongoClient.connect(uri, { useNewUrlParser: true }, function(
              err,
              client
            ) {
              const db = client.db("finalproject");
              resolve(
                db
                  .collection("books")
                  .find({ crn: arr[0] })
                  .toArray()
              );
            });
          } catch (e) {
            console.log(e);
          }
          client.close();
        }
      } else if (arr.length == 2) {
        try {
          MongoClient.connect(uri, { useNewUrlParser: true }, function(
            err,
            client
          ) {
            const db = client.db("finalproject");
            resolve(
              db
                .collection("books")
                .find({ name: arr[0], crn: arr[1] })
                .toArray()
            );
          });
        } catch (e) {
          console.log(e);
        }
        client.close();
      } else {
        reject(Error("invalid!"));
      }
    }, 100);
  });
};

// after an exchange is completed adds book to new user while removing it from previous
// array should be [prevOwner, newOwner, bookName, crn]
function dbBookChangeOwner(prevOwner, newOwner, bookName, crn) {
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://test:test@cluster0-k0fe1.mongodb.net/admin?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  try {
    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
      const db = client.db("finalproject");
      resolve(
        db
          .collection("books")
          .find({ username: arr[0] })
          .toArray()
      );
    });
  } catch (e) {
    console.log(e);
  }
  client.close();
}

router.post("/getBooks", function(req, res) {});

router.post("/addBook", function(req, res) {});

router.post("/deleteBook", function(req, res) {});

router.post("/editBook", function(req, res) {});

module.exports = router;


/*
dbBookAdd("admin", "test book", "12345");
dbBookAdd("admin", "test book 2: the sequel", "23456");
dbBookAdd("test", "test book 3: the third one", "34567");
dbBookLookup(["test book", "12345"]);
dbBookLookup(["test book 3: the third one", "34567"]);
dbBookChangeOwner("test", "admin", "test book 3: the third one", "34567");
*/