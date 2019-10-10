// var http = require('http')
//   , fs   = require('fs')
//   , url  = require('url')
//   , port = 8080; 
// var express = require('express');
// var app = express();
// var pg = require('pg');

/*app.get('/db', function (request, response) {
  pg.connect(, function(err, clinet, done) {
    clinet.query('SELECT * FROM test_table', function(err, result) {
      done();
      if(err){
        console.error(err); response.send("Error" + err);
      }else{
        response.render('page/db', {result: result.rows});
      }

    });
  });
});*/
// app.use(express.static(__dirname + '/public'));
// app.listen(8080);
// console.log('listening on 8080')


// var server = http.createServer (function (req, res) {
//   var uri = url.parse(req.url)

//   switch( uri.pathname ) {
//     case '/':
//       sendFile(res, 'public/index.html');
//       break;
//     case '/index.html':
//       sendFile(res, 'public/index.html');
//       break;
//     case '/team.html':
//       sendFile(res, 'public/team.html');
//       break;
//     case '/css/normalize.css':
//       sendFile(res, 'public/css/normalize.css', 'text/css');
//       break;  
//     case '/css/style.css':
//       sendFile(res, 'public/css/style.css', 'text/css');
//       break;
//     case '/css/app.css':
//       sendFile(res, 'public/css/app.css', 'text/css');
//       break;
//     case '/js/script.js':
//       sendFile(res, 'public/js/script.js', 'text/javascript');
//       break;
//     case '/js/jquery.ssd-vertical-navigation.min.js':
//       sendFile(res, 'public/js/jquery.ssd-vertical-navigation.min.js', 'text/javascript');
//       break;
//     default:
//       res.end('404 not found');
//   }
// })

// // server.listen(process.env.PORT || port);
// // console.log('listening on 8080')

// // subroutines

// function sendFile(res, filename, contentType) {
//   contentType = contentType || 'text/html';

//   fs.readFile(filename, function(error, content) {
//     res.writeHead(200, {'Content-type': contentType})
//     res.end(content, 'utf-8')
//   })

// }


var http = require('http')
  , fs = require('fs')
  , url = require('url')
  , port = 8080
  , express = require('express');
const app = express();

//connect to database
// const { Client } = require('pg')
// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });
// client.connect();

let cache = [];// Array is OK!
cache[0] = fs.readFileSync(__dirname + '/public/index.html');
cache[1] = fs.readFileSync(__dirname + '/public/team.html');

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(cache[0]);
});

app.get('/team', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(cache[1]);
});

app.get('/players', function getPlayerData(res, uri) {


  playerName = "Cristiano Ronaldo";
  function getPlayerData(playerName){
    var str = "SELECT * FROM team WHERE playerName = '"+playerName + "';" ;
  
    client.query(str, (err, res) => {
      //if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
        var result = JSON.stringify(row);
      }
      client.end();
    });
  
  }


});





//read css
app.use(express.static('public'));

var server = app.listen(process.env.PORT || 8080, function () {
  var host = server.address().address
  var post = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})