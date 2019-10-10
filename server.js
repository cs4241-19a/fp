const express = require('express'),
      passport = require( 'passport' ),
      LocalStrategy = require( 'passport-local' ).Strategy,
      bodyParser = require("body-parser"),
      compression = require('compression'),
      fs_service = require('./firestore_service.js'),
      favicon = require('serve-favicon'),
      path = require('path'),
      helmet = require('helmet'),
      app = express()

// http://expressjs.com/en/starter/static-files.html
//app.use( express.static(__dirname + '/public' ) );
app.use(express.static('dist'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, '/src/media', 'favicon.jpg')));
app.use(helmet());

fs_service.init();

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/login.html');
});

app.get('/receive', function (request, response) {
  fs_service.readAllUserData().then(myData=> {
    response.end(JSON.stringify(myData))
  });
});

/*
get url: /user_feed
response:
list of:
232: {
  music_post:{
    song: {title: "title1", artist: "artist1", song_id: 3},
    user: {username: "uname1", name: "Bob"},
    options: {height: 0, length: 0},
    postOrder: 2
  }
}
*/

app.get('/feed', function (request, response) {
  fs_service.readFeedData().then(feedData =>{
    response.end(JSON.stringify(feedData))
  });
});


/*
get url: /user_feed?username=bob
response:
list of:
232: {
  music_post:{
    song: {title: "title1", artist: "artist1", song_id: 3},
    user: {username: "uname1", name: "Bob"},
    options: {height: 0, length: 0},
    postOrder: 2
  }
}
*/
app.get('/user_feed', function (request, response) {
  fs_service.readUserFeed(request.query.username).then(feedData =>{
    response.end(JSON.stringify(feedData))
  })
})

/*
get url: /song_data?id=1
response:
{
  song_id: 2,
  song_bytes: "8936249872yr9h"
}
*/

app.get('/song_data', function (request, response){
  let song_id = request.query.id;
  fs_service.getSongData(song_id).then(song_data => {
    response.end(JSON.stringify(
      {song_id: song_id, song_bytes: song_data.byte_string} //base64 which is what mp3 needs to be converted from/to
    ))
  })
})

passport.use('local', new LocalStrategy( {
  usernameField: 'username',
  passwordField: 'password'
}, function( username, password, done ) {
  fs_service.readUserData(username).then(myData=> {
      if(myData === undefined || myData === null) {
        console.log("user not found");
        return done( null, false, { message:'user not found' })
      } else {
        const pass = myData.password;
        if ( pass !==  null && pass !== undefined && pass === password) {
          console.log("successfully authenticated");
          return done(null, {username, password})
        } else {
          console.log("incorrect password");
          return done( null, false, { message: 'incorrect password' })
        }
      }
    })
}));

app.use(passport.initialize());
//app.use(passport.session());

passport.serializeUser(function(username, done) {
  done(null, username);
});

passport.deserializeUser(function(username, done) {
  done(null, username);
});

app.post( '/login', passport.authenticate( 'local' ), function( req, res ) {
  console.log( 'username:', req.body.username );
  res.json({'status': true});
});


app.post( '/signup', function( request, response ) {
  let json = request.body;

  let username = JSON.stringify(json.username).replace(/^"(.*)"$/, '$1');
  fs_service.addNewUserProfile(username, json);

  response.writeHead( 200, { 'Content-Type': 'application/json'})
  response.end( JSON.stringify( request.body ) )
})


app.post( '/changePass', function( request, response ) {
  let json = request.body;

  let username = JSON.stringify(json.username).replace(/^"(.*)"$/, '$1');
  let password = JSON.stringify(json.password).replace(/^"(.*)"$/, '$1');
  fs_service.updateUserPassword(username, password);

  response.writeHead( 200, { 'Content-Type': 'application/json'})
  response.end( JSON.stringify( request.body ) )
})

/*
Format for post:
{
  music_post:{
    song: {title: "title1", artist: "artist1"},
    user: {username: "uname1", name: "Bob"},
    options: {height: 0, length: 0}
  },
  song_bytes: "826348379hd92..."
}
response:
{
  post_id: 3
}
*/

app.post('/post_music', function(request, response) {
  let body = request.body;
  let song = body.song_bytes;
  let post = body.music_post;
  fs_service.addSongData(song).then(song_id => {
    post.song.song_id = song_id;
    fs_service.addFeedPost(post).then(post_id => {
      response.writeHead( 200, { 'Content-Type': 'application/json'})
      response.end( JSON.stringify( {post_id: post_id} ) )
    })
  })
})

// listen for requests
const listener = app.listen(3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

