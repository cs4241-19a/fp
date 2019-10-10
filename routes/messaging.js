var express = require('express');
var path = require('path');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test@cluster0-k0fe1.mongodb.net/admin?retryWrites=true&w=majority";

/* GET messaging page. */
router.get('/', function(req, res, next) {
  res.sendFile('/public/pages/messaging.html', {root: path.dirname(__dirname)});
});

// message object should be { from: [username], to: [username], message: [message], time: [time] }
function sendMessage(fromUser, toUser, message) {
  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("finalproject");
    var myobj = { from: fromUser, to: toUser, message: message, time: new Date().getTime() };
    dbo.collection("messages").insertOne(myobj, function(err, res) {
      if (err) throw err;
      db.close();
    });
  });
}

let getMessages = function(arr) {
  console.log("getbookuser")
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
          const db = client.db('finalproject');
          resolve(db.collection('messages').find(
              {$or:[
                  {from: arr[0], to: arr[1]},
                  {from: arr[1], to: arr[0]}
              ]}
        ).toArray());
          client.close();
        })
      }
      catch(e) {
        console.log(e)
      }
    }, 100)
  })
};

router.post('/sendMessage', function(req, res) {
  console.log("sending message...")
  const from = req.body.from
  const to = req.body.to
  const message = req.body.message

  sendMessage(from, to, message)
});

router.post('/getConversation', function(req, res) {
  const from = req.body.from;
  const to = req.body.to;
  console.log("getting conversation between " + from + " and " + to + "...");

  getMessages([from, to]).then(data => {
    res.send(data)
  }).catch(e => {
    console.log(e)
  })
});

module.exports = router;
