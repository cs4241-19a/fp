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
