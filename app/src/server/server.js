const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');
const helmet = require('helmet');
const compression = require('compression');

const Constants = require('../shared/constants');
const Game = require('./game');
const webpackConfig = require('../../webpack.dev.js');

var mongodb = require( 'mongodb' )

const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+'/'+process.env.DB

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'a6-tiny-tanks' ).createCollection( 'user-info' )
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return "Connected to MongoDB"
  })
  .then( console.log )


// Setup an Express server
const app = express();
app.use(helmet());
app.use(compression());
app.use(express.static('public'));
app.use(require('body-parser').json())

if (process.env.NODE_ENV === 'development') {
  // Setup Webpack for development
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  // Static serve the dist/ folder in production
  app.use(express.static('dist'));
}

// Listen on port
const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Server listening on port ${port}`);

// Setup socket.io
const io = socketio(server);

// Listen for socket.io connections
io.on('connection', socket => {
  console.log('Player connected!', socket.id);

  socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
  socket.on(Constants.MSG_TYPES.INPUT, handleInput);
  socket.on('disconnect', onDisconnect);
});

// Setup the Game
const game = new Game();

function joinGame(username, image, map_number) {
  game.addPlayer(this, username, image, map_number);
}

function handleInput(dir) {
  game.handleInput(this, dir);
}

function onDisconnect() {
  game.removePlayer(this);
}

// routes

// if a post to login is received
app.post('/login_a_user', 
  function(req, res) {
    var json_data = req.body
    let query = {"username" : json_data.username}
    
    collection.find(query).toArray().then(items => {
        if(json_data.password === items[0].password){
            res.end(JSON.stringify({ valid_u_p:'1', displayName:items[0].displayName, image:items[0].color, scale:items[0].scale, turnSpeed: items[0].turnSpeed}))
        }
        else{
            res.end(JSON.stringify({ valid_u_p:'0' }))
        }
      });
    });

app.post('/update_user', 
  function(req, res) {
  var json_data = req.body
  let query = {"username" : json_data.username}

  collection.find(query).toArray().then(items => {
      items[0].displayName = json_data.displayName
      items[0].color = json_data.color
      collection.replaceOne( query, items[0] )
    });
  
  res.end(JSON.stringify({}));  
});

app.post('/update_scale', 
  function(req, res) {
  var json_data = req.body
  let query = {"username" : json_data.username}

  collection.find(query).toArray().then(items => {
      items[0].scale = json_data.scale
      items[0].turnSpeed = json_data.turnSpeed
      collection.replaceOne( query, items[0] )
    });
  
  res.end(JSON.stringify({}));  
});
