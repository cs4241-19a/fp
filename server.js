const express = require("express");
const mongodb = require("mongodb");
const app = express();

//app.use(express.static("public"));
app.use(express.static("cc"));
app.use(express.json());

app.use((req, res, next) => {
  if (collection !== null) {
    next();
  } else {
    res.status(503).send();
  }
});

const uri =
  "mongodb+srv://" +
  process.env.USER +
  ":" +
  process.env.PASS +
  "@" +
  process.env.HOST +
  "/" +
  process.env.DB;

const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const quiltClient = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let collection = null;
let quiltCollection = null;

const initialList = function(initList) {};

var dataSet = { users: [] };
var quiltDataSet = {codecrafters:[]};

client
  .connect()
  .then(() => {
    // will only create collection if it doesn't exist
    return client.db("test").createCollection("test");
  })
  .then(__collection => {
    collection = __collection;
    dataSet = collection.find({}).toArray();
    return collection.find({}).toArray();
  })
  .then(console.log);

quiltClient
  .connect()
  .then(() => {
    // will only create collection if it doesn't exist
    return quiltClient.db("grammar").createCollection("grammar");
  })
  .then(_qcollection => {
    quiltCollection = _qcollection;
    quiltDataSet = quiltCollection.find({}).toArray();
    return quiltCollection.find({}).toArray();
  });

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});


// route to get all docs
app.get("/", (req, res) => {
  if (collection !== null) {
    collection
      .find({})
      .toArray()
      .then(result => res.json(result));
  }
});

app.get("/iGetAll", (req, res) => {
  if (collection !== null) {
    collection
      .find({})
      .toArray()
      .then(result => {
        res.send(result);
      });
  }
});
app.get("/sGetAll", (req, res) => {
  if (collection !== null) {
    collection
      .find({})
      .toArray()
      .then(result => {
        res.send(result);
      });
  }
});

app.get("/qGetAll", (req, res) => {
  console.log("quilting")
  if (quiltCollection !== null) {
    quiltCollection
      .find({})
      .toArray()
      .then(result => {
        res.send(result);
      });
  }
});

app.get("/success", (request, response) => {
  response.sendFile(__dirname + "/cc/ccIndex.html");
});

app.post("/iClear", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});
//gotoGrammar
app.get("/gotoGrammar", (request, response) => {
  response.sendFile(__dirname + "/cc/ccIndex.html");
});

app.post("/sClear", (request, response) => {
  response.sendFile(__dirname + "/views/success.html");
});


app.post("/iAdd", (request, response) => {
  collection
    .insertOne({
      username: request.body.username,
      password: request.body.password
    })
    .then(result => response.json(result));
});
app.post("/sAdd", (request, response) => {
  collection
    .insertOne({
      username: request.body.username,
      password: request.body.password
    })
    .then(result => response.json(result));
});

app.post("/iRemove", (request, response) => {
  collection
    .deleteOne({ _id: mongodb.ObjectID(request.body._id) })
    .then(result => response.json(result));
  response.sendFile(__dirname + "/views/index.html");
});
app.post("/sRemove", (request, response) => {
  collection
    .deleteOne({ _id: mongodb.ObjectID(request.body._id) })
    .then(result => response.json(result));
  response.sendFile(__dirname + "/views/index.html");
});

app.post("/iUpdate", (req, res) => {
  collection
    .updateOne(
      { _id: mongodb.ObjectID(req.body._id) },
      { $set: { username: req.body.username, password: req.body.password } }
    )
    .then(result => res.json(result));
});
app.post("/sUpdate", (req, res) => {
  collection
    .updateOne(
      { _id: mongodb.ObjectID(req.body._id) },
      { $set: { username: req.body.username, password: req.body.password } }
    )
    .then(result => res.json(result));
});

app.listen(3000);
