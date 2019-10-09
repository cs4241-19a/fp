var app = require('../app');
var low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/userData.json');
const database = low(adapter);

exports.findById = function(id, cb) {
  var records = database.get(database.get(id));
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  var records = database.get( "users" )
  .find({ "username": username })
  .value();

  if (records == undefined) {
    console.log("bad username")
    return cb(null, null);
  }

  process.nextTick(function() {
    if (records.username === username) {
      return cb(null, records);
    }
    else {
      return cb(null, null);
    }
  });
}
