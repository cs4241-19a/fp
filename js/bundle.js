require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"map":[function(require,module,exports){
let activeCountries = [
  ['Country', 'Popularity'],
  ['', '']
];

function init() {
  $.get('/getMapsAPI', function(data) {
    google.charts.load('current', {
      'packages': ['geochart'],
      'mapsApiKey': data,
    }).then(() => {
      google.charts.setOnLoadCallback(drawRegionsMap);
    });
  });
}

function update(songData) {
  activeCountries = [
    ['Country', 'Popularity'],
  ];

  for (let i = 0; i < songData.length; i++) {
    activeCountries[activeCountries.length] =
      [songData[i].country, songData[i].pop];
  }
  drawRegionsMap();
}

function drawRegionsMap() {
  const data = google.visualization.arrayToDataTable(activeCountries);

  const options = {};

  const chart = new google.visualization.GeoChart(
      document.getElementById('map'));

  chart.draw(data, options);
}

module.exports = {init, update};

},{}],"player":[function(require,module,exports){
// Asking server for '/getSong' - return a song object
// Tell server to '/delete' using the song.id in the song object
// Telling map to .update() using song.countries
// Play song until done

function init() {
  player = new Spotify.Player({
    name: 'The Q',
    getOAuthToken: (callback) => {
      callback(token);
    },
    volume: 0.5,
  });
  player.connect().then((success) => {
    if (success) {
      console.log('The Web Playback SDK successfully connected to Spotify!');
    }
  });
  player.addListener('ready', ({device_id}) => {
    console.log('The Web Playback SDK is ready to play music!');
    console.log('Device ID', device_id);
  });
}

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


// INIT method - create player and connects to spotify..does other stuff maybe
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
let count = '0';
let countries = [];
let currentCountries = [];
let song;
const map = require('map');

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

function postToQueue() {
  if (!cooldown) {
    cooldown = 1;
    setTimeout(function() {
      cooldown = 0;
    }, 500);
    const xmlRequest = new XMLHttpRequest();
    xmlRequest.open('post', '/queue');
    xmlRequest.setRequestHeader(
        'Content-Type', 'application/json;charset=UTF-8');
    xmlRequest.send(JSON.stringify(song));
    xmlRequest.onload = function() {
      renderItem('queueTable', JSON.parse(xmlRequest.response), user);
    };
    map.update(currentCountries);
  }
}

async function makeSongObject(obj) {
  song = {
    id: count,
    spotify_id: obj.id,
    song_name: obj.childNodes[0].innerHTML,
    artist_name: obj.childNodes[1].innerHTML,
    artist_id: obj.childNodes[1].id,
    length: obj.childNodes[3].innerHTML,
    added_by: user,
    country_list: currentCountries,
  };
  postToQueue();
}

function queue() {
  $.get('/queueLen', function(data) {
    count=data;
  });
  getCountryData(event.currentTarget.childNodes[1].id, 
    event.currentTarget.id);
  setTimeout(makeSongObject, 2000, event.currentTarget);
}

async function getCountryData(artist_id, spotify_id) {
  const countryData = [];
  for (let country = 0; country < countries.length; country++) {
    fetch(`/searchCountries?${$.param({artist_id: artist_id,
      country: countries[country].code})}`, {
      credentials: 'include',
    }).then((res) => res.json())
        .then((data) => {
          if ('error' in data) {
            alert(data.error.message);
            return;
          }
          for (let i = 0; i < data.tracks.length; i++) {
            if (data.tracks[i].id == spotify_id) {
              countryData[countryData.length] = {
                country: countries[country].name,
                pop: data.tracks[i].popularity,
              };
            }
          }
        }).catch((err) => console.log(err));
  }
  currentCountries = countryData;
};

function deleteItem() {
  if (!cooldown) {
    cooldown = 1;
    setTimeout(function() {
      cooldown = 0;
    }, 500);
    const xmlRequest = new XMLHttpRequest();
    xmlRequest.open('post', '/delete');
    xmlRequest.setRequestHeader(
        'Content-Type', 'application/json;charset=UTF-8');
    xmlRequest.send(JSON.stringify({id: event.currentTarget.id}));
    xmlRequest.onload = function() {
      updateQueue();
    };
  }
}

function renderItem(table, item, user) {
  const ms = item.duration_ms;
  const min = Math.floor((ms/1000/60) << 0);
  const sec = Math.floor((ms/1000) % 60);
  const time = min+':'+sec;
  if (table == 'searchTable') {
    document.getElementById(table).innerHTML +=
        '<tr class=\'songItem\' id='+item.id+' onclick="q.queue()">'+
        '<td class=\'song\'>'+item.name+'</td><td id='+item.artists[0].id+
        ' class=\'artist\'>'+
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
  $.get('/countries', function(data) {
    countries = JSON.parse(data);
  });
  updateQueue();
}

module.exports = {init, search, queue, deleteItem};

},{"map":"map"}]},{},[]);
