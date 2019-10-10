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
