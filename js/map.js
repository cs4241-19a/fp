let activeCountries = [];

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

function mapSong(songData) {
  activeCountries = []; // TODO - accessed via queue.q
}

function drawRegionsMap() {
  const data = google.visualization.arrayToDataTable(activeCountries);

  const options = {};

  const chart = new google.visualization.GeoChart(
      document.getElementById('map'));

  chart.draw(data, options);
}

module.exports = {init, mapSong};
