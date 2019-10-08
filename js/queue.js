let cooldown = 0;
let user = null;
let count = 0;
const q = [];

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
            addToQ(JSON.parse(data));
          }
        }
    );
  }
}

function addToQ(song) {
  q[q.length] = {
    name: song.name,
    uri: song.uri,
    countries: [], // TODO - get country stats from request
  };
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
  updateQueue();
}

module.exports = {init, search, queue, deleteItem, q};
