require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"map":[function(require,module,exports){
let earth = null;

function init() {
  earth = new WE.map('earth');
  earth.setView([46.8011, 8.2266], 2);
  WE.tileLayer('https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg', {
    tileSize: 256,
    bounds: [[-85, -180], [85, 180]],
    minZoom: 0,
    maxZoom: 16,
    attribution: 'WebGLEarth example',
    tms: true,
  }).addTo(earth);
  console.log('init earth');
}

module.exports = {init};

},{}],"player":[function(require,module,exports){
// const play = ({
//   spotify_uri,
//   playerInstance: {
//     _options: {
//       token,
//       id,
//     },
//   },
// }) => {
//   fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
//     method: 'PUT',
//     body: JSON.stringify({uris: [spotify_uri]}),
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//   });
// };

// function addToQ(uri) {
//   queue[queue.length] = uri;
//   playQ();
// }

// function playQ() {
//   while (queue.length > 0) {
//     if (!player.getCurrentState()) {
//       if (queue.length > 1) {
//         for (let i = 0; i < queue.length; i++) {
//           queue[i] = queue[i+1];
//         }
//         queue.pop();
//       }
//       playSong(queue[0]);
//     }
//   }
//   playSong(queue[0]);
// }

// function playSong(uri) {
//   play({
//     playerInstance: new Spotify.Player({name: 'The Q'}),
//     spotify_uri: uri,
//   });
// }

// window.onSpotifyWebPlaybackSDKReady = () => {
//   player = new Spotify.Player({
//     name: 'The Q',
//     getOAuthToken: (callback) => {
//       callback(token);
//     },
//     volume: 0.5,
//   });
//   player.connect().then((success) => {
//     if (success) {
//       console.log('The Web Playback SDK successfully connected to Spotify!');
//     }
//   });
//   player.addListener('ready', ({device_id}) => {
//     console.log('The Web Playback SDK is ready to play music!');
//     console.log('Device ID', device_id);
//   });
// };

},{}],"queue":[function(require,module,exports){
let cooldown = 0;
let user = null;
let count = 0;

function logOut() {
  $.get('/logout', function(data, status) {
    if (status == 'success') {
      console.log('Logged out of session.');
    }
  });
  document.getElementById('log-in-modal').style.display = 'block';
}

function search(e) {
  e.preventDefault();
  document.getElementById('searchTable').innerHTML = '';
  const q = $('#searchText').val();
  const params = $.param({q: q});
  fetch(`/search?${params}`, {
    credentials: 'include',
  }).then((res) => res.json())
      .then((data) => {
        if ('error' in data) {
          alert(data.error.message);
          return;
        }
        for (let i = 0; i < data.tracks.items.length; i++) {
          renderItem('searchTable', data.tracks.items[i], null);
        }
      }).catch((err) => console.log(err));
  return false;
}

function queue() {
  if (!cooldown) {
    cooldown = 1;
    setTimeout(function() {
      cooldown = 0;
    }, 500);
    $.get('/queueLen', function(data) {
      count=data;
    });
    $.post('/queue',
        {
          id: count,
          spotify_uri: event.currentTarget.id,
          song_name: event.currentTarget.childNodes[0].innerHTML,
          artist_name: event.currentTarget.childNodes[1].innerHTML,
          length: event.currentTarget.childNodes[3].innerHTML,
          added_by: user,
        },
        function(data, status) {
          if (status === 'success') {
            renderItem('queueTable', JSON.parse(data), user);
            // addToQ(JSON.parse(data).spotify_uri);
          }
        }
    );
  }
}

function deleteItem() {
  if (!cooldown) {
    cooldown = 1;
    setTimeout(function() {
      cooldown = 0;
    }, 500);
    $.post('/delete',
        {
          id: event.currentTarget.id,
        },
        function(data, status) {
          if (status === 'success') {
            updateQueue();
          }
        });
  }
}

function renderItem(table, item, user) {
  const ms = item.duration_ms;
  const min = Math.floor((ms/1000/60) << 0);
  const sec = Math.floor((ms/1000) % 60);
  const time = min+':'+sec;
  if (table == 'searchTable') {
    document.getElementById(table).innerHTML +=
        '<tr class=\'songItem\' id='+item.uri+' onclick="q.queue()">'+
        '<td class=\'song\'>'+item.name+'</td><td class=\'artist\'>'+
        item.artists[0].name+'</td><td class=\'album\'>'+item.album.name+
        '</td><td class=\'length\'>'+time+'</td></tr>';
  } else {
    document.getElementById(table).innerHTML +=
        '<tr id='+item.spotify_uri+'><td class=\'song\'>'+
        item.song_name+'</td><td class=\'artist\'>'+item.artist_name+
        '</td><td class=\'length\'>'+item.length+'</td><td class=\'added\'>'+
        user+'</td><td class=\'delete\' onclick="q.deleteItem()" id='+
        item.id+'><i class=\'fas fa-trash\'></i></td></tr>';
  }
}

function updateQueue() {
  document.getElementById('queueTable').innerHTML = '';
  let queue = {};
  $.get('/getQueue', function(data, status) {
    if (status == 'success') {
      queue = JSON.parse(data);
      for (let i = 0; i < queue.length; i++) {
        renderItem('queueTable', queue[i], user);
      }
    }
  });
}

function init() {
  document.querySelector('#searchForm').addEventListener('submit', search);
  $.get('/user', function(data) {
    user=data;
    if (user) {
      document.getElementById('log-in-modal').style.display = 'none';
    } else {
      document.getElementById('log-in-modal').style.display = 'block';
    }
  });
  $.get('/queueLen', function(data) {
    count=data;
  });
  $.get('/token', function(data) {
    token=data;
  });
  updateQueue();
}

module.exports = {init, logOut, search, queue, deleteItem};

},{}]},{},[]);
