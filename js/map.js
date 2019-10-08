let map = null;
let activeCountries = null;

function init() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: new google.maps.LatLng(30, 0),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
  activeCountries = new google.maps.FusionTablesLayer({
    query: {
      select: 'geometry',
      from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk',
      where: 'ISO_2DIGIT IN (\'US\', \'GB\', \'DE\')',
    },
    map: map,
    suppressInfoWindows: true,
  });
}

module.exports = {init};
