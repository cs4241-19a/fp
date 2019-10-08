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
