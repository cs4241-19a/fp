var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "jpinzer",
  password: "root"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});